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
  const Comp = () => {
    const timer = useTimer(1, () => {
      expired = true;
    });
    React.useEffect(() => {
      timer.start();
    }, [timer]);
    return null;
  };
  render(React.createElement(Comp));
  await new Promise(r => setTimeout(r, 1100));
  assert.ok(expired);
});
