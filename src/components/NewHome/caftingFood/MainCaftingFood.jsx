import React from 'react'
import SeondrayHeading from '../SeondrayHeading/SeondrayHeading'
import CraftingFood from './craftingFood'

function CraftingFoodMain() {
  return (
    <div className='py-5'  >
        <div>

        <SeondrayHeading HeadingText="CRAFTING FOOD" />
        </div>
        <div>
            <CraftingFood/>
        </div>
    </div>
  )
}

export default CraftingFoodMain