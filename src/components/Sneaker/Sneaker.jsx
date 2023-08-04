import React from "react";
import { Link } from "react-router-dom";

import { toFormatPrice, toFormatBrand, imageImport } from "@utils/helpers";
import { appContext } from "@services/Context";

import "./Sneaker.styles.scss";

import heartDefault from "@assets/images/icons/product-heart-default.svg";
import heartLiked from "@assets/images/icons/product-heart-liked.svg";
import arrowBack from "@assets/images/icons/back-arrow.svg";

function Sneaker({ item }) {
    const { isInFavourites, addToFavourites } = React.useContext(appContext);
    const [size, setSize] = React.useState(0);
    
    const images = imageImport();

    // TODO: исправить бренд New Balance, исправить баг со скролом (смотрите также) или заменить на слайдер, исправить размеры, возможность открывать в отдельном окне

    //TODO: исправить кнопку назад при пустой истории
    return (
        <div className="product">
            <div className="product__top">
                <div className="product__top-left product-left">
                    <Link to={ -1 }>
                        <img
                            src={ arrowBack } 
                            alt="back" 
                            width={ 50 } 
                            height={ 50 } 
                            className="product-left__back-icon" 
                        />
                    </Link>
                    <h4 className="product-left__title">Описание товара</h4>
                    <img 
                        onClick={ () => addToFavourites(item) }
                        src={ isInFavourites(item) ? heartLiked : heartDefault } 
                        alt={ isInFavourites(item) ? "dislike" : "like" }  
                        width={ 50 } 
                        height={ 50 } 
                        className="product-left__icon" 
                    />
                    <img src={ item.img } alt={ item.name } width={ 600 } height={ 650 } className="product-left__image" />
                </div>
                <div className="product__top-right product-right">
                    <h1 className="product-right__title">{ item.name }</h1>
                    <h4 className="product-right__subtitle">
                        <span>By</span>
                        <img 
                            src={ images.filter(obj => obj.includes(toFormatBrand(item.brand).replace(' ', '-'))) } 
                            alt={ item.brand } 
                            width={ 40 } 
                            height={ 40 } 
                        />
                        <span>{ toFormatBrand(item.brand) }</span>
                    </h4>
                    <p className="product-right__article">{ `Арт. ${item.id}` }</p>
                    <p className="product-right__color">{ `Цвет: ${item.color}` }</p>
                    <h5 className="product-right__text">Размер:</h5>
                    <div className="product-right__sizes">
                        { item.sizes.map((obj, i) => { 
                            return (
                                <button onClick={ () => setSize(obj) } key={ i } className={ Number(obj) === Number(size) ? "active" : "" }>{ obj }</button>
                            )}
                        )}
                    </div>
                    <div className="product-right__price">
                        <p className="product-right__price-text">{ `${toFormatPrice(item.price)} ₽` }</p>
                        <button className="product-right__price-btn btn">Купить</button>
                    </div>
                </div>
            </div>
            <h4 className="product__title">О товаре:</h4>
            <div className="product__description">{ item.description }</div>
        </div>
    )
}

export default Sneaker;