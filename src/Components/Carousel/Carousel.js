import React, { useState, useEffect } from 'react';
import './Carousel.css';
import data from './data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';


const Carousel = () => {
    const [images] = useState(data);
    const [index1, setIndex] = useState(0);

    useEffect(() => {
        const lastIndex = images.length - 1;
        if (index1 < 0) {
            setIndex(lastIndex);
        }
        if (index1 > lastIndex) {
            setIndex(0);
        }
    }, [index1, images]);

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index1 + 1);
        }, 5000);
        return () => {
            clearInterval(slider);
        };
    }, [index1]);

    const moveDot = index => {
        setIndex(index)
    }


    return (
        <section className="section">
            <div className="section-center">
                {images.map((item, indexPeople) => {
                    const { id, image } = item;
                    let position = "nextSlide";
                    if (indexPeople === index1) {
                        position = "activeSlide";
                    }
                    if (
                        indexPeople === index1 - 1 ||
                        (index1 === 0 && indexPeople === images.length - 1)
                    ) {
                        position = "lastSlide";
                    }
                    return (
                        <article className={position} key={id}>
                            <img src={image} className="person-img" />
                        </article>
                    );
                })}
                <button className={index1 === 0 ? "is-hidden" : "prev"} onClick={() => setIndex(index1 - 1)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <button className={index1 === images.length - 1 ? "is-hidden" : "next"} onClick={() => setIndex(index1 + 1)}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
            <div className="container-dots">
                {Array.from({ length: 4 }).map((item, index) => (
                    <div
                        onClick={() => moveDot(index)}
                        className={index1 === index ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default Carousel;