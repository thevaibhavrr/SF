import React from 'react'
import craftingFood1 from "../../../assets/img/NewHome/craftingFood1.svg"
import craftingFood2 from "../../../assets/img/NewHome/craftingFood2.svg"
import craftingFood3 from "../../../assets/img/NewHome/craftingFood3.svg"
import craftingFood4 from "../../../assets/img/NewHome/craftingFood4.svg"
function CraftingFood() {
    const images = [craftingFood1, craftingFood2, craftingFood3, craftingFood4]
  return (
    <div className='w-100 d-flex justify-content-center mt-4 ' >
        <div className='d-flex justify-content-around gap-5 ' >
            {images.map((image, index) => (
                <img key={index} src={image} alt="Crafting Food" width="300px" className='img-fluid' />
            ))}
        </div>
    </div>
  )
}

export default CraftingFood