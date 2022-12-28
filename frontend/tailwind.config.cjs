/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'instagram':"#C13584",
        "discord":"#5865F2",
        "github":"#3b82f6",
        "gitlab":"#FC6D27",
        "blog":"#3b82f6",
        "gitea":"#609926"
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(blue|indigo|red|orange)-(500|600|700|800)/,
      variants: ['hover', 'before', 'hover:before']
    },
    {
      pattern: /text-(instagram|discord|github|gitlab|blog|gitea)/,
      variants: ['hover']
    },
    {
      pattern: /-?top-(1\/2|1\/3|1\/4|[0-9]+)/
    },
    {
      pattern: /z-[(0|1|2|3|4|5|6|7)]/
    }
  ]
}
