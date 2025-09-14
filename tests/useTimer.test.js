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
