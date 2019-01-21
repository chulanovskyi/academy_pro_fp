import { ClickEvent, DivNode, Action } from 'models';

export const onOutsideClick = (evt: ClickEvent, node: DivNode, action: Action) => {
  evt.preventDefault();
  evt.stopPropagation();
  if (evt.target && node.current) {
    const isOutsideNode = (evt.target as Element).closest(`.${node.current.className}`) === null;
    isOutsideNode && action();
  }
};
