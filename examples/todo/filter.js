var yo = require('yo-yo')

module.exports = (state, model) => yo `
    <div>
        ${state.filter.values.map((v, i) => yo `
          <span>
            ${(state.filter.selected !== i)
              ? yo `<a href="#" onclick=${ev => {
                ev.preventDefault()
                model.updateFilter(i)
              }}>${v}</a>`
              : v
            }
          </span>
        `)}
    </div>
`
