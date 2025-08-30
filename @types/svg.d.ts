declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.svg?component' {
  import React = require('react');
  const component: React.FC<React.SVGProps<SVGSVGElement>>;
  export default component;
}
