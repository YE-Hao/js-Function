/**
 * @author YE
 * @param
 * tagName<String>, props<Object>,children<Array>
 * @description 创建节点
 * date 2020/08/28
 */
function Element({ tagName = '', props = {}, children = [] }) {
  if (!(this instanceof Element)) {
    return new Element({ tagName, props, children });
  }
  this.tagName = tagName || '';
  this.props = props || {};
  this.children = children || [];
}
Element.prototype.render = function() {
  var ele = document.createElement(this.tagName),
    props = this.props,
    children = this.children,
    // propsName,
    propsValue;
    // 组装属性
  for(var key in props) {
    propsValue = props[key];
    ele.setAttribute(key, propsValue);
  };
  children.forEach((item) => {
    var child;
    if (item instanceof Element) {
      child = item.render();
    } else {
      child = document.createTextNode(item);
    }
    ele.appendChild(child);
  });
  return ele;
};
(function(){
  var elem = Element({
    tagName: 'ul',
    props: {'class': 'list'},
    children: [
        Element({
          tagName: 'li',
          props: {},
          children: [
            Element({
              tagName: 'span',
              props: { 'style': 'font-size: 20px'},
              children: ['ceshi'],
            }),
          ],
        }),
        Element({tagName: 'li', children: ['item2']}),
    ]
  });
  document.getElementById('app').appendChild(elem.render());
})()