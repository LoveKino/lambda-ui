'use strict';

let {
    view, n
} = require('kabanery');

let fold = require('kabanery-fold');

let triangle = require('css-shapes-object/lib/triangle');

let TreeSelect = require('kabanery-tree-select');

let {
    infixTypes
} = require('./model');

let {
    mergeMap
} = require('bolzano');

module.exports = view(({
    predicates,
    onExpand,
    onselected,
    hideExpressionExpandor
}) => {
    return () => fold({
        head: (ops) => {
            return n('div', {
                style: mergeMap(
                    ops.isHide() ? triangle({
                        direction: 'right',
                        top: 5,
                        bottom: 5,
                        left: 5,
                        color: '#737373'
                    }) : triangle({
                        direction: 'left',
                        top: 5,
                        bottom: 5,
                        right: 5,
                        color: '#737373'
                    }), {
                        position: 'absolute',
                        bottom: 0,
                        marginLeft: 5,
                        cursor: 'pointer'
                    }
                ),

                onclick: () => {
                    ops.toggle();
                    onExpand && onExpand(ops.isHide());
                }
            });
        },

        hide: hideExpressionExpandor,

        body: () => {
            return n('div', {
                style: {
                    display: 'inline-block',
                    marginLeft: 15,
                    position: 'absolute',
                    bottom: 0
                }
            }, TreeSelect({
                data: infixTypes({
                    predicates
                }),
                onselected: (v, path) => {
                    onselected && onselected(v, path);
                }
            }));
        }
    });
});