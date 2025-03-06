import React, { JSX } from 'react';

export const StyleGuide = () => {
  const colors = [
    "bg-red",
    "bg-accentYellow",
    "bg-accentGreen",
    "bg-accentBlue",
    "bg-blue",
    "bg-green",
    "bg-beige",
    "bg-brown",
    "bg-grey-100",
    "bg-grey-400",
    "bg-grey-800",
    "bg-charcoal",
  ];

  return (
    <div>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="colors py-20">
          <h1 className="font-header">Colors</h1>
          <div className="grid grid-cols-2 gap-4">
            {colors.map((color) => (
              <div key={color} className={`w-16 h-16 ${color} relative`}>
                <p className="absolute bottom-0">{color.replace('bg-', '')}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="font text-left py-20">
          <h1 className="font-header">Fonts</h1>
          {[
            { tag: 'h1', className: 'header text-charcoal font-header font-semibold text-6xl tracking-tight pb-6', text: 'h1: This is the Heading' },
            { tag: 'h1', className: 'mobile-header text-charcoal font-header font-semibold text-4xl tracking-tight pb-6', text: 'h1: This is the mobile Heading' },
            { tag: 'h2', className: 'font-header font-normal text-charcoal text-5xl pb-6 tracking-tighter', text: 'h2: This is a Subheading' },
            { tag: 'h2', className: 'font-header mobile-subheader font-normal text-charcoal text-2xl pb-6 tracking-tighter', text: 'h2: This is a mobile subHeader' },
            { tag: 'h3', className: 'mobile-subheading text-charcoal font-subHeading font-semibold text-xl tracking-normal pb-6', text: 'h3: This is the mobile subheading' },
            { tag: 'h3', className: 'eyebrow uppercase font-header font-bold text-accentGreen text-lg', text: 'h3 : eyebrow' },
            { tag: 'p', className: 'text-xl font-body tracking-tight pb-2', text: 'p: This is body text' },
            { tag: 'p', className: 'mobile-body text-l font-body tracking-tight font-[800] pb-2', text: 'p: This is mobile body text(needs to be semibold)' },
          ].map((font, index) => {
            const Tag = font.tag as keyof JSX.IntrinsicElements;
            return <Tag key={index} className={font.className}>{font.text}</Tag>;
          })}
          <div className="flags flex flex-row gap-6">
            {[
              { className: 'green-flag bg-accentGreen font-body text-beige tracking-normal', text: 'flag' },
              { className: 'yellow-flag font-body bg-accentYellow text-blue', text: 'flag' },
              { className: 'font-body red-flag bg-red text-beige', text: 'flag' },
            ].map((flag, index) => (
              <span key={index} className={flag.className}>
                <span className="px-[20px] py-2">{flag.text}</span>
              </span>
            ))}
          </div>
          <div>
            <div className="buttons py-20">
              <h1 className="font-header">Buttons</h1>
              <div className="flex flex-wrap gap-4">
                {[
                  { className: 'btn-primary-blue uppercase font-body bg-blue min-w-[364px] text-lg text-white leading-tight font-[600] py-[20px] px-[110px] text-center', text: 'Primary Button' },
                  { className: 'btn-primary-blue-rounded bg-blue capatalize min-w-[121px] text-white py-[10px] px-[50px] rounded text-center', text: 'Rounded'},
                  { className: 'btn-secondary-blue bg-white active:bg-grey-40  border-1 border-accentBlue text-charcoal min-w-[364px] py-[10px] px-4 rounded text-center', text: 'Secondary Button' },
                  { className: 'btn-primary-green bg-accentGreen uppercase min-w-[364px] text-white leading-tight font-[600] font-body text-lg py-[20px] px-[110px] text-center', text: 'Accent Button' },
                  { className: 'btn-danger bg-red text-beige py-[10px] px-[50px]  rounded', text: 'Danger Button' },
                ].map((button, index) => (
                  <a key={index} href="#" className={button.className}>
                    {button.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};