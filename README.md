markdown-withimg-loader
====

Just add this loader after `marked-frontmatter-loader`, it will parse content to add img as deps.

```js
{
    loader: ['markdown-withimg-loader', {
        loader: "marked-frontmatter-loader"
    }]
}
```

## Example

Look [./example](./example) and run `webpack`