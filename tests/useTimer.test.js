process.env.TS_NODE_COMPILER_OPTIONS = '{"module":"commonjs"}';
require('ts-node/register');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

const React = require('react');
const { render } = require('@testing-library/react');
const { test } = require('node:test');
const assert = require('assert');
const useTimer = require('../src/utils/useTimer.ts').default;

test('calls onExpire when timer runs out', async () => {
  let expired = false;
  let timer = null;
  
  const Comp = () => {
    timer = useTimer(1, () => {
      expired = true;
    });
    React.useEffect(() => {
      timer.start();
      return () => timer.stop(); // Cleanup on unmount
    }, [timer]);
    return null;
  };
  
  const { unmount } = render(React.createElement(Comp));
  
  try {
    // Wait for timer to expire with a reasonable timeout
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timer test timed out after 2 seconds'));
      }, 2000);
      
      const checkExpired = () => {
        if (expired) {
          clearTimeout(timeout);
          resolve();
        } else {
          setTimeout(checkExpired, 50);
        }
      };
      
      setTimeout(checkExpired, 1100); // Start checking after timer should expire
    });
    
    assert.ok(expired, 'Timer should have expired');
  } finally {
    // Always clean up
    if (timer) timer.stop();
    unmount();
  }
});

test('addSeconds increases timeLeft while timer is stopped', async () => {
  let timer = null;
  const Comp = () => {
    timer = useTimer(10, () => {});
    return null;
  };
  const { unmount } = render(React.createElement(Comp));
  try {
    // Before start, timeLeft is the initial duration (10)
    assert.strictEqual(timer.timeLeft, 10, 'Initial timeLeft should be 10');
    timer.addSeconds(5);
    // Give React a chance to flush the state update
    await new Promise(resolve => setTimeout(resolve, 50));
    assert.strictEqual(timer.timeLeft, 15, 'timeLeft should be 15 after addSeconds(5)');
  } finally {
    if (timer) timer.stop();
    unmount();
  }
});

test('addSeconds increases timeLeft while timer is running', async () => {
  let addSecondsFn = null;
  let timer = null;
  const Comp = () => {
    timer = useTimer(10, () => {});
    // Capture addSeconds via ref so we don't depend on timer identity
    addSecondsFn = timer.addSeconds;
    React.useEffect(() => {
      timer.start();
      // Empty deps so start() is only called once (avoids timeLeft reset on re-render)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
  };
  const { unmount } = render(React.createElement(Comp));
  try {
    // Timer is running; no tick has occurred yet (<1000ms)
    addSecondsFn(15);
    await new Promise(resolve => setTimeout(resolve, 100));
    assert.ok(
      timer.timeLeft >= 20,
      `timeLeft should be around 25 after addSeconds(15) on a fresh timer, got ${timer.timeLeft}`
    );
  } finally {
    if (timer) timer.stop();
    unmount();
  }
});
