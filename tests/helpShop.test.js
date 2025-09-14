process.env.TS_NODE_COMPILER_OPTIONS = '{"module":"commonjs"}';
require('ts-node/register');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

const React = require('react');
const { render, fireEvent, cleanup } = require('@testing-library/react');
const { test } = require('node:test');
const assert = require('assert');

const { HelpShop } = require('../src/components/HelpShop.tsx');
const { HelpSystemProvider } = require('../src/contexts/HelpSystemContext.tsx');

test('deducts points when purchasing help item', () => {
  let coins = 20;
  const onPurchase = cost => {
    coins -= cost;
  };
  const { getByText, getAllByText } = render(
    React.createElement(HelpSystemProvider, null,
      React.createElement(HelpShop, { onClose: () => {}, coins, onPurchase })
    )
  );
  fireEvent.click(getByText('10 pts'));
  assert.strictEqual(coins, 10);
  cleanup();
});

test('does not purchase when coins insufficient', () => {
  let coins = 5;
  const onPurchase = cost => {
    coins -= cost;
  };
  const { getAllByText } = render(
    React.createElement(HelpSystemProvider, null,
      React.createElement(HelpShop, { onClose: () => {}, coins, onPurchase })
    )
  );
  const button = getAllByText('10 pts')[0];
  fireEvent.click(button);
  assert.strictEqual(coins, 5);
  cleanup();
});
