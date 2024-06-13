// import React, { useState, useEffect } from 'react';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import './Carousel.css';
// import Banner01 from "../../../Images/Home/banner/Banner01.png"
// import Banner02 from "../../../Images/Home/banner/Banner02.svg"
// import Banner03 from "../../../Images/Home/banner/Banner03.svg"
// import Banner04 from "../../../Images/Home/banner/Banner04.svg"
// import Banner05 from "../../../Images/Home/banner/Banner05.svg"
// import MainImage from "../../../Images/Home/ourprodutImages/all_packs_images.png"


// const Carousel = ({  active: initialActive = 0 }) => {

//     const items = [MainImage];
//     const [active, setActive] = useState(initialActive);
//     const [direction, setDirection] = useState('');

//     useEffect(() => {
//         if (!items.length) {
//             console.error("Carousel: 'items' prop is empty or undefined.");
//         }
//     }, [items]);

//     const moveLeft = () => {
//         setActive((prevActive) => (prevActive - 1 + items.length) % items.length);
//         setDirection('left');
//     };

//     const moveRight = () => {
//         setActive((prevActive) => (prevActive + 1) % items.length);
//         setDirection('right');
//     };

//     const generateItems = () => {
//         const itemComponents = [];
//         for (let i = active - 2; i < active + 3; i++) {
//             let index = i;
//             if (i < 0) {
//                 index = items.length + i;
//             } else if (i >= items.length) {
//                 index = i % items.length;
//             }
//             const level = active - i;
//             itemComponents.push(<Item key={index} id={items[index]} level={level} />);
//         }
//         return itemComponents;
//     };

//     return (
//         <div id="carousel" className="noselect">
//             <div className="arrow arrow-left" onClick={moveLeft}>
//                 <i className="fi-arrow-left"></i>
//             </div>
//             <TransitionGroup component={null}>
//                 <CSSTransition key={active} classNames={direction} timeout={1000}>
//                     <div className="carousel-items">{generateItems()}</div>
//                 </CSSTransition>
//             </TransitionGroup>
//             <div className="arrow arrow-right" onClick={moveRight}>
//                 <i className="fi-arrow-right"></i>
//             </div>
//         </div>
//     );
// };

// const Item = ({ id, level }) => {
//     const className = `item level${level}`;
//     return <div className={className}>{id}</div>;
// };

// export default Carousel;

import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Carousel.css';
import Banner01 from "../../../Images/Home/banner/Banner01.png"
import Banner02 from "../../../Images/Home/banner/Banner02.svg"
import Banner03 from "../../../Images/Home/banner/Banner03.svg"
import Banner04 from "../../../Images/Home/banner/Banner04.svg"
import Banner05 from "../../../Images/Home/banner/Banner05.svg"
import MainImage from "../../../Images/Home/ourprodutImages/all_packs_images.png"



const Carousel = ({  active: initialActive = 0 }) => {
    const items = [Banner01, Banner02, Banner03, Banner04, Banner05, MainImage];
        const [active, setActive] = useState(initialActive);
        const [direction, setDirection] = useState('');
    
        useEffect(() => {
            if (!items.length) {
                console.error("Carousel: 'items' prop is empty or undefined.");
            }
        }, [items]);
    
        const moveLeft = () => {
            setActive((prevActive) => (prevActive - 1 + items.length) % items.length);
            setDirection('left');
        };
    
        const moveRight = () => {
            setActive((prevActive) => (prevActive + 1) % items.length);
            setDirection('right');
        };
    
        const generateItems = () => {
            const itemComponents = [];
            for (let i = active - 2; i < active + 3; i++) {
                let index = i;
                if (i < 0) {
                    index = items.length + i;
                } else if (i >= items.length) {
                    index = i % items.length;
                }
                const level = active - i;
                itemComponents.push(<Item key={index} src={items[index]} level={level} />);
            }
            return itemComponents;
        };
    
        return (
            <div id="carousel" className="noselect">
                <div className="arrow arrow-left" onClick={moveLeft}>
                    <i className="fi-arrow-left"></i>
                </div>
                <TransitionGroup component={null}>
                    <CSSTransition key={active} classNames={direction} timeout={1000}>
                        <div className="carousel-items">{generateItems()}</div>
                    </CSSTransition>
                </TransitionGroup>
                <div className="arrow arrow-right" onClick={moveRight}>
                    <i className="fi-arrow-right"></i>
                </div>
            </div>
        );
    };
    
    const Item = ({ src, level }) => {
        const className = `item level${level}`;
        return <img className={className} src={src} alt="carousel item" />;
    };
    
    export default Carousel;