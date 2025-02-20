export const StyleGuide = () => {
  return (
    <div>
      <h1 className="header">Hi Super Team</h1>
      <div className="w-[1200px]mx-auto grid grid-cols-2 gap-2">
        <div className="colors py-20">
          <h1 className="font-header">Colors</h1>
          <div className="grid grid-flow-col grid-rows-4 gap-10 justify-center">
            <div className="w-16 h-16 bg-red"></div>
            <div className="w-16 h-16 bg-blue"></div>
            <div className="w-16 h-16 bg-accentGreen"></div>
            <div className="w-16 h-16 bg-accentYellow"></div>
            <div className="w-16 h16 bg-beige"></div>
            <div className="w-16 h-16 bg-lightGrey"></div>
          </div>
        </div>
        <div className="font text-left py-20">
          <h1 className="font-header">Fonts</h1>
          <h1 className="header text-charcoal font-header font-semibold text-6xl tracking-tight pb-6" >h1: This is the Heading</h1>
          <h2 className="font-header font-normal text-charcoal text-5xl pb-6 tracking-tighter">h2 : This is a Subheading</h2>
          <h3 className="eyebrow uppercase font-header font-bold text-accentGreen text-lg">h3 : eyebrow</h3>
          <p className="text-xl font-body tracking-tight pb-2">p: This is body text</p>
          <div className="flags flex flex-row gap-6">
            <span className="green-flag bg-accentGreen font-body text-beige tracking-normal">
              <h3 className="px-[20px] py-2">flag</h3>
            </span>
            <span className="yellow-flag font-body bg-accentYellow text-blue">
              <h3 className="px-[20px] py-2">flag</h3>
            </span>
            <span className="font-body red-flag bg-red text-beige">
              <h3 className="px-[20px] py-2">flag</h3>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}