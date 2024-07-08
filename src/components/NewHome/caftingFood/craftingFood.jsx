import React from 'react'
import craftingFood1 from "../../../assets/img/NewHome/craftingFood1.png"
import craftingFood2 from "../../../assets/img/NewHome/craftingFood2.png"
import craftingFood3 from "../../../assets/img/NewHome/craftingFood3.png"
import craftingFood4 from "../../../assets/img/NewHome/craftingFood4.png"
import "../../../styles/NewHome/craftingFood.css"
function CraftingFood() {
    const images = [craftingFood1, craftingFood2, craftingFood3, craftingFood4]
    // const images=[]
  return (
    <div className='w-100 d-flex justify-content-center mt-4 ' >
        <div className='craftingFood_div ' >
            {images.map((image, index) => (
                <img key={index} src={image} alt="Crafting Food"  className='craftingFood_image' />
            ))}
        </div>
    </div>
  )
}

export default CraftingFood