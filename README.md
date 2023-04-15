# 11ty-bt

Eleventy with bootstrap

Bootstrap added with sass
Generated css files are

- purged (not used styles are removed)
- minified (html and css as well)

`safelist: [/show/, /data-bs-*/, /popover-*/]` config added to purgeCss.
If any of the bootstrap element not working comment out purgeCss and check if the
desired element are working. If yes than you need to locate which class responsible
for the behaviour, but removed by purgeCss and add to the `safelist` in the `.eleventy.js` file.
