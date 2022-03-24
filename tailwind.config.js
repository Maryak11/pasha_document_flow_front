module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    typography: {
      DEFAULT: {
        css: {
          h1: {
            fontSize: '30px',
          },
          h2: {
            fontSize: '20px',
          },

          ol: {
            padding: '0 1rem',
            listStyleType: 'decimal',
            listStylePosition: 'outside',
          },
          ul: {
            padding: '0 2rem',
          },
          li: {
            position: 'relative',
          },
          table: {
            border: ' 1px solid #ccc',
            borderCollapse: 'collapse',
            tableLayout: 'fixed',
            width: '100%',
            margin: '0',
            overflow: 'hidden',
          },
          tr: {
            border: '1px solid #ccc',
          },
          th: {
            minWidth: '1em',
            border: '2px solid #ced4da',
            padding: '3px 5px',
            verticalAlign: 'top',
            boxSizing: 'border-box',
            position: 'relative',
            fontWeight: 'bold',
            textAlign: 'left',
            backgroundColor: '#f1f3f5',
          },
          td: {
            minWidth: '1em',
            border: '2px solid #ced4da',
            padding: '3px 5px',
            verticalAlign: 'top',
            boxSizing: 'border-box',
            position: 'relative',
          },

          p: {
            display: 'block',
          },
          a: {
            color: '#68cef8',
          },
        },
      },
    },
    extend: {
      inset: {
        4.5: '1.125rem',
      },
      fontFamily: {
        sans: ['Manrope', 'sans'],
      },
      boxShadow: {
        'button-inset': 'inset 0 0 10px -5px rgba(0, 0, 0, 0.3)',
        'button-inset-md': 'inset 0 0 20px rgba(0, 0, 0, 0.2)',
        budge: '0px 5px 30px rgba(186, 19, 88, 0.2)',
        notifications: '-5px 30px 140px rgba(126, 123, 160, 0.1);',
      },
      dropShadow: {
        budge: '0px 5px 30px rgba(186, 19, 88, 0.2)',
      },
      maxWidth: {
        127: '127px',
        215: '215px',
        193: '193px',
        '7rem': '7rem',
      },
      maxHeight: {
        'screen-60': '60vh',
        notifications: '410px',
        120: '32rem',
        '7rem': '7rem',
      },
      padding: {
        inputPad: '11px',
      },
      colors: {
        header: '#363636',
        inputBorDef: 'rgba(66, 71, 112, 0.3)',
        reviewsBg: '#FAFAFA',
        selectBg: 'rgba(252, 252, 252)',
        bgStep: 'rgba(66, 71, 112, 0.1)',
        'dark-blue': '#424770',
        'dark-text': '#1A203D',
        'custom-gray': '#c8c8c8',
        'sidebar-bg': '#fbf1f1',
        'bg-main': '#fbf7f7',
        purple: '#9367C2',
        'social-bg': '#f4f4f4',
        statusBudge: {
          success: '#219653',
          warning: '#FFD336',
          danger: '#FE2424',
        },
        notifications: {
          'text-gray': '#4C4C66',
          'text-purple': '#6F6C99',
        },
      },
      width: {
        42: '10.5rem',
        104: '24rem',
      },
      backgroundImage: {
        dashed: 'linear-gradient(to right, #424770 80%, rgba(255, 255, 255, 0) 30%)',
        dashedBlack: 'linear-gradient(to right, rgb(0, 0, 0) 80%, rgba(255, 255, 255, 0) 30%)',
        tableHead: 'linear-gradient(90deg, rgb(236, 235, 254) -13.54%, rgb(253, 235, 245) 108.96%)',
        bgLoginLayout:
          'linear-gradient(90deg, rgb(255, 240, 6) -13.54%, rgb(231, 186, 48) 108.96%)',
        bgPreparationElement:
          ' linear-gradient(90deg, rgb(240, 235, 167) -13.54%, rgb(244, 228, 178) 108.96%)',
      },
      backgroundSize: {
        bgDashed: '13px 1px',
      },
      minHeight: {
        204: '204px',
      },
      minWidth: {
        265: '265px',
      },
      gridTemplateColumns: {
        recieveMethodsMobile: '1',
        recieveMethods: 'repeat(auto-fill, minmax(144px, 1fr));',
        partnerCol: 'repeat(auto-fill, minmax(190px, 1fr));',
        loanOptions: 'repeat(auto-fit, minmax(280px, 1fr));',
        news: 'repeat(auto-fit, minmax(310px, 1fr));',
        footerElements: 'repeat(auto-fit, minmax(100px, 1fr));',
        vacancy: 'repeat(auto-fit, minmax(400px, 1fr));',
        vacancyMobile: 'repeat(auto-fit, minmax(280px, 1fr));',
        footer: 'repeat(auto-fit, minmax(600px, 1fr))',
        footerTablet: 'repeat(auto-fit, minmax(280px, 1fr))',
        payMethods: 'repeat(auto-fit, minmax(168px, 1fr));',
        mobilePreparationCol: '1fr 10fr;',
      },
      gridTemplateRows: {
        mobilePreparationRow: 'repeat(2, 30px)',
        desktopPreparationRow: 'repeat(3, 70px)',
      },
      gridAutoRows: {
        '1fr': '1fr',
      },
      zIndex: {
        60: 60,
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled', 'active'],
      boxShadow: ['disabled', 'active'],
      transitionProperty: ['focus'], // ???? button base styles
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
      backgroundOpacity: ['active', 'disabled'],
      ringColor: ['focus'],
      backgroundImage: ['hover'],
      cursor: ['disabled'],
      textOpacity: ['disabled'],
      borderRadius: ['last', 'first'],
      borderWidth: ['last', 'first'],
      textAlign: ['last', 'hover', 'group-hover'],
      padding: ['last'],
      margin: ['group-hover', 'hover'],
      gap: ['group-hover', 'hover', 'last'],
      display: ['group-hover', 'hover'],
      scale: ['group-hover', 'hover'],
      translate: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
