import {useNavigate, useLocation} from "react-router-dom";
import {useContext, useState} from "react";
import classNames from "classnames";

import {imageImport, isPWA, toFormatBrandForRequest} from "@utils/helpers";
import {brands} from "@utils/constants";
import {appContext} from "@services";
import {useNoScroll} from "@hooks";

import "./Header.style.scss";


export default function Header() {
    const {isMale, isRegisteredUser, setIsMale, setAuthPopup} = useContext(appContext);
    const [popupMenu, changePopupMenu] = useState(false);

    const images = imageImport();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    
    useNoScroll(popupMenu);


    const onClickProfile = () => {
        if (isRegisteredUser) {
            navigate('/customer/account');
        } else {
            setAuthPopup();
        }
    }

    const onClickGender = (gender) => {
        setIsMale(gender);
  
        if (pathname !== '/catalog/') {
            navigate('/catalog/');
        }
    }

    const onClickBrand = (value) => {
        navigate(`/catalog/?brands=${toFormatBrandForRequest(value)}`);
        changePopupMenu(false);
    }

    
    const popupMenuRender = () => {
        return (
            <div className={classNames("header__blackout blackout", popupMenu && "active")}>
                <div className={classNames("header__blackout-mobile header-mobile", popupMenu && "active")}>
                    {isPWA() ? (
                        <>
                            <h4 className="header-mobile__title">Бренды</h4>
                            <ul className="header-mobile__list header-mobile__list--brands">
                                {brands.map(({id, brand}) => (
                                    <li className="header-nav__el--brands" onClick={() => onClickBrand(brand)} key={id}>
                                        <img src={images.filter(obj => obj.includes(brand))} alt={brand}/>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <ul className="header-mobile__list header-mobile__list--app">
                            {menuItemsRender()}
                            <li className="header-nav__el" onClick={() => navigate('/about')}>
                                <svg className="header-nav__el-icon" height="20" viewBox="0 0 20 20" width="20">
                                    <path d="M10.625 13.75V8.75H8.125V10H9.375V13.75H7.5V15H12.5V13.75H10.625Z" fill="#1F1F21"/>
                                    <path d="M10 5C9.81458 5 9.63332 5.05498 9.47915 5.158C9.32498 5.26101 9.20482 5.40743 9.13386 5.57873C9.06291 5.75004 9.04434 5.93854 9.08051 6.1204C9.11669 6.30225 9.20598 6.4693 9.33709 6.60041C9.4682 6.73152 9.63525 6.82081 9.8171 6.85699C9.99896 6.89316 10.1875 6.87459 10.3588 6.80364C10.5301 6.73268 10.6765 6.61252 10.7795 6.45835C10.8825 6.30418 10.9375 6.12292 10.9375 5.9375C10.9375 5.68886 10.8387 5.4504 10.6629 5.27459C10.4871 5.09877 10.2486 5 10 5Z" fill="#1F1F21"/>
                                    <path d="M10 18.75C8.26942 18.75 6.57769 18.2368 5.13876 17.2754C3.69983 16.3139 2.57832 14.9473 1.91606 13.3485C1.25379 11.7496 1.08051 9.9903 1.41813 8.29296C1.75575 6.59563 2.58911 5.03653 3.81282 3.81282C5.03653 2.58911 6.59563 1.75575 8.29296 1.41813C9.9903 1.08051 11.7496 1.25379 13.3485 1.91606C14.9473 2.57832 16.3139 3.69983 17.2754 5.13876C18.2368 6.57769 18.75 8.26942 18.75 10C18.75 12.3206 17.8281 14.5462 16.1872 16.1872C14.5462 17.8281 12.3206 18.75 10 18.75ZM10 2.5C8.51664 2.5 7.0666 2.93987 5.83323 3.76398C4.59986 4.58809 3.63856 5.75943 3.07091 7.12988C2.50325 8.50032 2.35473 10.0083 2.64411 11.4632C2.9335 12.918 3.64781 14.2544 4.6967 15.3033C5.7456 16.3522 7.08197 17.0665 8.53683 17.3559C9.99168 17.6453 11.4997 17.4968 12.8701 16.9291C14.2406 16.3614 15.4119 15.4001 16.236 14.1668C17.0601 12.9334 17.5 11.4834 17.5 10C17.5 8.01088 16.7098 6.10323 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5Z" fill="#1F1F21"/>
                                </svg>
                                <span className="header-nav__el-text">О магазине</span>
                            </li>
                            <li className="header-nav__el" onClick={() => navigate('/about')}>
                                <svg className="header-nav__el-icon" fill="none" height="21" viewBox="0 0 20 21" width="20">
                                    <path d="M10 19.632C14.9706 19.632 19 15.6025 19 10.632C19 5.6614 14.9706 1.63196 10 1.63196C5.02944 1.63196 1 5.6614 1 10.632C1 15.6025 5.02944 19.632 10 19.632Z" stroke="#1F1F21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7.3811 7.93196C7.5927 7.33046 8.01034 6.82325 8.56006 6.50018C9.10978 6.1771 9.75611 6.059 10.3846 6.1668C11.013 6.2746 11.583 6.60133 11.9937 7.08913C12.4043 7.57694 12.6291 8.19433 12.6281 8.83196C12.6281 10.632 9.9281 11.532 9.9281 11.532" stroke="#1F1F21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10 15.132H10.009" stroke="#1F1F21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="header-nav__el-text">Помощь</span>
                            </li>
                            <li className="header-nav__el" onClick={() => navigate('/brands')}>
                                <svg className="header-nav__el-icon" height="19" viewBox="0 0 15 19" width="15">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.4494 18.632H4.54219C2.30836 18.6271 0.5 16.7499 0.5 14.4357V4.81943C0.504641 2.50871 2.31165 0.636766 4.54219 0.631958H10.4494C12.6832 0.631958 14.4954 2.50531 14.5 4.81943V14.4357C14.5 15.5486 14.0732 16.6159 13.3136 17.4029C12.5539 18.1899 11.5236 18.632 10.4494 18.632ZM4.54219 2.02195C3.05274 2.02676 1.84641 3.27645 1.84177 4.81943V14.4357C1.84177 15.9821 3.04945 17.2372 4.54219 17.242H10.4494C11.9454 17.242 13.1582 15.9855 13.1582 14.4357V4.81943C13.1536 3.27304 11.9421 2.02195 10.4494 2.02195H4.54219ZM3.86709 7.21477H9.5211C9.83578 7.17665 10.0731 6.90049 10.0731 6.57222C10.0731 6.24395 9.83578 5.96779 9.5211 5.92967H3.86709C3.62819 5.90074 3.39451 6.01648 3.26633 6.22726C3.13806 6.43803 3.13806 6.70641 3.26633 6.91718C3.39451 7.12796 3.62819 7.2437 3.86709 7.21477ZM3.86709 14.2085H7.90084C8.13975 14.2374 8.37342 14.1216 8.5016 13.9109C8.62987 13.7001 8.62987 13.4317 8.5016 13.2209C8.37342 13.0102 8.13975 12.8944 7.90084 12.9234H3.86709C3.62819 12.8944 3.39451 13.0102 3.26633 13.2209C3.13806 13.4317 3.13806 13.7001 3.26633 13.9109C3.39451 14.1216 3.62819 14.2374 3.86709 14.2085ZM11.1329 10.7116H3.86709C3.62819 10.7405 3.39451 10.6248 3.26633 10.414C3.13806 10.2033 3.13806 9.93487 3.26633 9.7241C3.39451 9.51333 3.62819 9.39758 3.86709 9.42652H11.1329C11.4476 9.46464 11.6849 9.7408 11.6849 10.0691C11.6849 10.3973 11.4476 10.6735 11.1329 10.7116Z" fill="#1F1F21"/>
                                </svg>
                                <span className="header-nav__el-text">Бренды</span>
                            </li>
                        </ul>
                    )}
                    <svg className="header-mobile__logo" onClick={() => navigate('/')} height="30" viewBox="0 0 110 30" width="110">
                        <path d="M80.2694 13.7143C80.2694 8.91384 80.2694 6.51361 81.1952 4.68008C82.0096 3.06726 83.3091 1.756 84.9074 0.93423C86.7245 0 89.1032 0 93.8605 0H96.4088C101.166 0 103.545 0 105.362 0.93423C106.96 1.756 108.26 3.06726 109.074 4.68008C110 6.51361 110 8.91384 110 13.7143V16.2857C110 21.0862 110 23.4864 109.074 25.3199C108.26 26.9327 106.96 28.244 105.362 29.0658C103.545 30 101.166 30 96.4088 30H93.8605C89.1032 30 86.7245 30 84.9074 29.0658C83.3091 28.244 82.0096 26.9327 81.1952 25.3199C80.2694 23.4864 80.2694 21.0862 80.2694 16.2857V13.7143Z" fill="#1F1F21"/>
                        <path d="M94.7454 25.8849C94.2241 24.4325 93.8891 23.3725 93.7183 22.661C93.0448 19.859 93.0053 17.0605 93.588 14.229C93.6964 13.7265 94.2704 12.164 94.5572 11.6083C94.9462 10.8436 95.8236 9.2682 95.841 9.29021C95.8483 9.30488 95.7312 9.55429 95.5712 9.85139C95.1423 10.673 94.2161 13.246 94.0392 14.1079C93.7213 15.6997 93.612 16.9486 93.6544 18.4762C93.6814 19.2849 93.7812 20.3797 93.8419 20.4567C93.8809 20.5062 94.3101 20.3411 94.5852 20.1632C94.7959 20.022 95.0811 19.6956 95.1525 19.5012C95.1983 19.3765 95.1923 19.3581 95.082 19.3471C95.0155 19.338 94.9657 19.3178 94.9724 19.2995C94.9805 19.2775 95.1893 19.1069 95.436 18.9198C96.0952 18.4228 96.265 18.2027 96.5608 17.5187C96.7277 17.1335 96.7918 16.9245 96.7577 16.9135C96.7236 16.9025 96.6022 16.9043 96.4768 16.9172C95.8522 16.9741 95.8578 16.9759 96.1762 16.853C96.6855 16.6604 97.036 16.2771 97.25 15.6774C97.3497 15.406 97.351 15.4023 97.2221 15.4592C96.8873 15.6096 96.8572 15.5876 97.1433 15.3968C97.3792 15.2391 97.4805 15.1364 97.5552 14.9677C97.6137 14.843 97.6401 14.7366 97.6174 14.7293C97.5946 14.7219 97.4938 14.7715 97.3876 14.8356C97.2814 14.8998 97.0979 14.9842 96.9828 15.0209L96.7665 15.0906L97.0359 14.9109C97.692 14.4744 97.9427 14.1204 98.1397 13.3593L98.2576 12.9174L98.0833 12.9596C97.9862 12.9816 97.8064 13.0384 97.6929 13.088C97.3929 13.2127 97.4345 13.1687 97.8617 12.8881C98.3894 12.5414 98.6803 12.303 98.8763 12.0462C99.078 11.7913 99.1824 11.5419 99.1028 11.5162C99.0062 11.4851 97.9704 11.6062 97.4962 11.7034C97.2359 11.7548 97.0331 11.7878 97.0385 11.7731C97.0533 11.7328 97.7182 11.4797 98.3178 11.2834C98.9441 11.0834 99.1008 11.0027 99.2442 10.8028C99.3325 10.6836 99.5701 9.74285 99.6123 9.33389L99.628 9.18718L98.8495 9.40365L99.0941 9.25692C99.4589 9.04232 99.81 8.69203 99.974 8.38393C100.055 8.23354 100.102 8.10517 100.085 8.09967C100.068 8.09417 99.905 8.15653 99.7158 8.23907C99.3823 8.38581 98.813 8.5344 98.7797 8.48672C98.7653 8.47389 98.9231 8.37301 99.1218 8.2648C100.164 7.69438 100.231 7.59718 100.129 6.87098L100.063 6.41069L99.8975 6.44738L99.7301 6.48774L99.8228 6.37403C100.034 6.12645 100.103 5.767 100.027 5.22969C99.9911 4.94728 99.9564 4.6612 99.9622 4.59335L99.9629 4.47048L99.2533 4.67227C98.4369 4.90524 98.025 5.09232 97.5512 5.44813C97.3672 5.58569 97.197 5.70307 97.1715 5.70307C97.1461 5.70307 97.2063 5.5912 97.3026 5.44999C97.4047 5.31061 97.4773 5.18223 97.4629 5.1694C97.4239 5.11988 96.5195 5.40238 96.3492 5.51976C96.1204 5.67566 96.0142 5.98192 95.9801 6.61093C95.9623 6.88418 95.941 7.11525 95.9283 7.11525C95.9142 7.11892 95.859 6.87135 95.8056 6.56694C95.7536 6.25885 95.6938 5.98928 95.6778 5.96361C95.6431 5.9196 94.6273 6.45334 94.322 6.67893C94.1226 6.82382 94.1033 6.92835 94.1865 7.32446C94.2216 7.47116 94.235 7.59036 94.2209 7.59403C94.2055 7.60137 94.0964 7.50052 93.9813 7.38132C93.8676 7.25847 93.7628 7.16312 93.7545 7.16862C93.6634 7.20897 93.5148 7.35386 93.4865 7.43088C93.4677 7.48223 93.531 7.70779 93.621 7.92968C93.7168 8.1534 93.7762 8.32028 93.7562 8.30561C93.7361 8.29094 93.656 8.23226 93.5745 8.17725C93.4043 8.05257 93.3578 8.05807 93.3902 8.21211C93.4076 8.32031 93.4063 8.32398 93.3088 8.2433C93.0565 8.03059 92.9951 7.99025 92.9516 8.00492C92.8434 8.03978 92.189 8.88707 92.1162 9.08514C92.0637 9.22818 92.0996 9.4244 92.3402 10.257C92.441 10.6054 92.5231 10.9355 92.5269 10.9941C92.53 11.0895 92.5143 11.0803 92.3984 10.9116C92.3331 10.8126 92.1383 10.4954 91.9751 10.213C91.8133 9.9269 91.6651 9.69035 91.6424 9.68302C91.5856 9.66468 91.4037 10.004 91.1066 10.6917C90.8108 11.3757 90.7685 11.6985 90.9124 12.1716C91.0039 12.476 91.0865 12.5971 91.7194 13.3305C91.9545 13.6074 92.1682 13.8733 92.1874 13.9247C92.2067 13.976 91.916 13.7468 91.5242 13.3947C91.1368 13.0482 90.8044 12.7768 90.7763 12.7841C90.7144 12.797 90.5725 13.7194 90.5569 14.1944C90.5257 14.9885 90.678 15.4561 91.1706 16.0869C91.3657 16.3344 91.5203 16.5361 91.509 16.5325C91.5033 16.5306 91.3203 16.406 91.096 16.2556C90.7187 16.0026 90.6916 15.9897 90.649 16.0539C90.5127 16.252 90.6238 16.8663 90.8662 17.2441C90.9418 17.3669 91.0031 17.477 90.9991 17.488C90.995 17.499 90.8806 17.499 90.7476 17.4806C90.4617 17.4458 90.4328 17.4898 90.5438 17.7759C90.6441 18.0216 90.6482 18.0106 90.4951 17.9776C90.3831 17.9538 90.3907 17.985 90.5718 18.3224C90.6813 18.5259 90.9395 18.9129 91.1475 19.1769C91.4915 19.6244 91.5047 19.6574 91.3481 19.5822L91.18 19.5033L91.2938 19.6262C91.4535 19.7967 91.7997 20.0479 92.1921 20.2771C92.8427 20.6512 92.9313 20.7906 93.0743 21.6121C93.4335 23.644 94.5146 26.6514 94.935 26.7871C94.9747 26.7999 95.0169 26.7889 95.025 26.7669C95.0344 26.7412 94.9074 26.3433 94.7454 25.8849ZM95.9114 9.20218C95.8984 9.18567 95.9049 9.15083 95.9314 9.13065C95.9592 9.10681 95.9722 9.12332 95.9574 9.16366C95.9482 9.20584 95.9231 9.22235 95.9114 9.20218Z" fill="#E1E0E0"/>
                        <path d="M23.7709 10.704C23.7709 17.7394 18.5112 20.0023 12.5175 20.0023H9.09248C8.39933 20.0023 7.86928 20.5371 7.86928 21.2366V28.848C7.86928 29.3829 7.42077 29.8766 6.84994 29.8766H1.01934C0.530055 29.8766 0 29.3417 0 28.848V4.77943C0 3.17486 0.897016 1.98171 2.32409 1.40571C2.73182 1.28229 3.13956 1.2 3.54729 1.2H12.5175C18.9189 1.2 23.7709 3.87428 23.7709 10.704ZM15.8609 10.6629C15.8609 8.31771 14.6377 7.08343 12.3136 7.08343H5.42287C5.62674 7.08343 5.87138 7.12457 6.15679 7.20686C6.44221 7.33029 6.68685 7.45371 6.93149 7.65943C7.42077 8.15314 7.74696 8.60571 7.74696 9.34628V12.8846C7.74696 13.2549 7.86928 13.584 8.15469 13.7897C8.39933 14.0366 8.68475 14.16 9.01093 14.16H12.3136C14.5154 14.16 15.8609 12.9257 15.8609 10.6629Z" fill="#1F1F21"/>
                        <path d="M27.2714 28.8891V4.82057C27.2714 2.80457 28.8208 1.24114 30.8187 1.24114H47.4543C47.9843 1.24114 48.5144 1.776 48.5144 2.31086V6.384C48.5144 6.672 48.392 6.91886 48.1882 7.08343C47.9843 7.28914 47.7397 7.37143 47.4543 7.37143H32.3681C33.5913 7.37143 34.6106 8.35886 34.6106 9.59314V11.3211C34.6106 12.0617 35.1814 12.5966 35.8746 12.5966H44.7224C45.4156 12.5966 45.7825 12.9669 45.7825 13.6663V17.3691C45.7825 18.0686 45.4156 18.4389 44.7224 18.4389H32.3681C33.5097 18.4389 34.6106 19.3851 34.6106 20.5783V22.512C34.6106 22.8 34.7329 23.088 34.9776 23.376C35.1814 23.664 35.5076 23.7874 35.8746 23.7874H47.7804C48.4328 23.7874 48.8406 24.1989 48.8406 24.8571V28.8891C48.8406 29.4651 48.3513 29.9177 47.7804 29.9177H28.2907C27.6791 29.9177 27.2714 29.5063 27.2714 28.8891Z" fill="#1F1F21"/>
                        <path d="M77.4065 29.6709C77.2434 29.8354 77.0395 29.9177 76.7949 29.9177H71.0866C70.3119 29.9177 69.7411 29.5474 69.4149 28.8069L65.2968 20.5783C65.0521 20.1257 64.6852 19.92 64.1959 19.92H58.8138C59.9962 19.92 61.0563 20.8663 61.0563 22.1006V28.8891C61.0563 29.2183 60.9748 29.4651 60.7709 29.6297C60.5671 29.8354 60.3224 29.9177 59.9962 29.9177H54.451C53.8394 29.9177 53.4317 29.5063 53.4317 28.8891V4.82057C53.4317 2.84571 55.0219 1.24114 56.979 1.24114H65.623C71.8205 1.24114 76.9988 3.91543 76.9988 10.6217C76.9988 14.0366 75.694 16.6286 72.6768 18.2743C72.4729 18.4389 72.3506 18.6034 72.3506 18.8091C72.3506 19.0149 72.3914 19.1383 72.4321 19.2617L77.5288 28.6011C77.6104 28.7657 77.6511 28.9303 77.6511 29.0537C77.6511 29.2594 77.5696 29.4651 77.4065 29.6709ZM69.1295 10.5806C69.1295 9.46971 68.8033 8.60571 68.1917 7.98857C67.5393 7.41257 66.6831 7.12457 65.5822 7.12457H58.5692C59.7516 7.12457 60.7709 8.15314 60.7709 9.34628V12.6377C60.7709 13.3371 61.3418 13.9131 62.0349 13.9131H65.5822C67.7432 13.9131 69.1295 12.8434 69.1295 10.5806Z" fill="#1F1F21"/>
                    </svg>
                </div>
            </div>
        );
    }

    const menuItemsRender = () => {
        return (
            <>
                <li className="header-nav__el" onClick={() => navigate('/catalog')}>
                    <svg className="header-nav__el-icon" height="18" viewBox="0 0 18 18" width="18">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2.25002 0H5.34002C5.93852 0 6.51232 0.2384 6.93462 0.6625C7.35682 1.0867 7.59272 1.6615 7.59002 2.26V5.34C7.59002 6.5826 6.58272 7.59 5.34002 7.59H2.25002C1.00742 7.59 2.12752e-05 6.5826 2.12752e-05 5.34V2.26C-0.00257872 1.6615 0.233222 1.0867 0.655522 0.6625C1.07772 0.2384 1.65152 0 2.25002 0ZM5.34002 6.08C5.75202 6.0746 6.08462 5.742 6.09002 5.33V2.26C6.09002 1.8458 5.75422 1.51 5.34002 1.51H2.25002C1.83582 1.51 1.50002 1.8458 1.50002 2.26V5.33C1.50542 5.742 1.83812 6.0746 2.25002 6.08H5.34002Z" fill="#1F1F21"/>
                        <path clipRule="evenodd" fillRule="evenodd" d="M12.6602 0H15.7502C16.3486 0 16.9224 0.2384 17.3447 0.6625C17.7669 1.0867 18.0028 1.6615 18.0002 2.26V5.34C18.0002 6.5826 16.9928 7.59 15.7502 7.59H12.6602C11.4175 7.59 10.4102 6.5826 10.4102 5.34V2.25C10.4102 1.0074 11.4175 0 12.6602 0ZM15.7502 6.08C16.1621 6.0746 16.4948 5.742 16.5002 5.33V2.26C16.5002 1.8458 16.1644 1.51 15.7502 1.51H12.6602C12.2459 1.51 11.9102 1.8458 11.9102 2.26V5.33C11.9155 5.742 12.2482 6.0746 12.6602 6.08H15.7502Z" fill="#1F1F21"/>
                        <path clipRule="evenodd" fillRule="evenodd" d="M2.25002 10.4099H5.34002C6.58272 10.4099 7.59002 11.4173 7.59002 12.6599V15.7499C7.59002 16.9926 6.58272 17.9999 5.34002 17.9999H2.25002C1.65152 17.9999 1.07772 17.7615 0.655522 17.3374C0.233222 16.9132 -0.00257872 16.3384 2.12752e-05 15.7399V12.6599C2.12752e-05 11.4173 1.00742 10.4099 2.25002 10.4099ZM5.34002 16.4899C5.75422 16.4899 6.09002 16.1541 6.09002 15.7399V12.6599C6.08462 12.248 5.75202 11.9153 5.34002 11.9099H2.25002C1.83812 11.9153 1.50542 12.248 1.50002 12.6599V15.7399C1.50002 16.1541 1.83582 16.4899 2.25002 16.4899H5.34002Z" fill="#1F1F21"/>
                        <path clipRule="evenodd" fillRule="evenodd" d="M12.6602 10.4099H15.7502C16.9928 10.4099 18.0002 11.4173 18.0002 12.6599V15.7399C18.0028 16.3384 17.767 16.9132 17.3447 17.3374C16.9225 17.7615 16.3487 17.9999 15.7502 17.9999H12.6602C12.0617 17.9999 11.4879 17.7615 11.0656 17.3374C10.6434 16.9132 10.4075 16.3384 10.4102 15.7399V12.6599C10.4102 11.4173 11.4175 10.4099 12.6602 10.4099ZM15.7502 16.4899C16.1644 16.4899 16.5002 16.1541 16.5002 15.7399V12.6599C16.4948 12.248 16.1621 11.9153 15.7502 11.9099H12.6602C12.2482 11.9153 11.9156 12.248 11.9102 12.6599V15.7399C11.9102 16.1541 12.246 16.4899 12.6602 16.4899H15.7502Z" fill="#1F1F21"/>
                    </svg>
                    <span className="header-nav__el-text">Каталог</span>
                </li>
                <li className="header-nav__el" onClick={onClickProfile}>
                    <svg className="header-nav__el-icon" height="18" viewBox="0 0 13 18" width="13">
                        <path clipRule="evenodd" fillRule="evenodd" d="M12.7313 13.239L12.9286 14.265C13.1156 15.152 12.931 16.0842 12.4252 16.8067C11.9194 17.5293 11.1454 17.9669 10.3144 18H2.68557C1.85462 17.9669 1.08055 17.5293 0.574732 16.8067C0.0689914 16.0842 -0.115565 15.152 0.0713747 14.265L0.268673 13.239C0.495565 11.8501 1.58613 10.8294 2.87465 10.8H10.1254C11.4139 10.8294 12.5044 11.8501 12.7313 13.239ZM10.3144 16.641C10.7319 16.6357 11.1247 16.4239 11.3831 16.065V16.074C11.7002 15.6386 11.8238 15.0712 11.7202 14.526L11.5229 13.5C11.4134 12.7397 10.8279 12.1703 10.1254 12.141H2.87465C2.1721 12.1703 1.58662 12.7397 1.47712 13.5L1.27983 14.526C1.17888 15.0683 1.30227 15.6317 1.61688 16.065C1.87525 16.4239 2.26812 16.6357 2.68557 16.641H10.3144Z" fill="#1F1F21"/>
                        <path clipRule="evenodd" fillRule="evenodd" d="M6.91098 9.00001H6.08891C4.27286 9.00001 2.80061 7.38829 2.80061 5.40001V3.02401C2.79839 2.2213 3.08874 1.45072 3.60723 0.883093C4.12571 0.315463 4.82957 -0.00241617 5.56278 1.38301e-05H7.43711C8.1704 -0.00241617 8.87418 0.315463 9.39266 0.883093C9.91114 1.45072 10.2015 2.2213 10.1993 3.02401V5.40001C10.1993 7.38829 8.72711 9.00001 6.91098 9.00001ZM5.56278 1.35001C4.71834 1.35001 4.03372 2.09953 4.03372 3.02401V5.40001C4.03372 6.64264 4.95387 7.65001 6.08891 7.65001H6.91098C8.04602 7.65001 8.96617 6.64264 8.96617 5.40001V3.02401C8.96617 2.58004 8.80512 2.15425 8.5183 1.84033C8.23156 1.52641 7.84264 1.35001 7.43711 1.35001H5.56278Z" fill="#1F1F21"/>
                    </svg>
                    <span className="header-nav__el-text">Профиль</span>
                </li>
                <li className="header-nav__el">
                    <svg className="header-nav__el-icon" height="18" viewBox="0 0 14 18" width="14">
                        <path clipRule="evenodd" fillRule="evenodd" d="M3.37571 0.00433333H10.6242C11.4759 -0.0391667 12.3105 0.246235 12.9438 0.797535C13.5771 1.34893 13.9571 2.12083 14 2.94303V16.9964C14.0012 17.2778 13.8794 17.5467 13.6645 17.737C13.4497 17.9273 13.1617 18.0213 12.8713 17.9959C12.6168 17.996 12.3694 17.9152 12.1671 17.766L7.68341 14.4776C7.26001 14.1711 6.67781 14.1711 6.25441 14.4776L1.81211 17.766C1.61561 17.9111 1.37611 17.9916 1.12871 17.9959C0.838309 18.0213 0.55031 17.9273 0.33551 17.737C0.12061 17.5467 -0.00119122 17.2778 8.78391e-06 16.9964V2.94303C0.0428088 2.12083 0.422809 1.34893 1.05621 0.797535C1.68951 0.246235 2.52411 -0.0391667 3.37571 0.00433333ZM8.64641 13.2881L12.426 16.0868L12.4053 2.94303C12.3073 2.07153 11.5087 1.43363 10.6035 1.50363H3.35501C2.44981 1.43363 1.65131 2.07153 1.55331 2.94303V16.0868L5.33281 13.2881C6.31151 12.5683 7.66781 12.5683 8.64641 13.2881Z" fill="#1F1F21"/>
                    </svg>
                    <span className="header-nav__el-text">Избранное</span>
                </li>
                <li className="header-nav__el" onClick={() => navigate('/cart')}>
                    <svg className="header-nav__el-icon" height="18" viewBox="0 0 18 18" width="18">
                        <path d="M0.765144 0C0.34257 0 0 0.33579 0 0.75C0 1.16421 0.34257 1.5 0.765144 1.5H1.14114C1.48276 1.5 1.78299 1.72198 1.87684 2.04396L4.3032 10.3681C4.58475 11.334 5.48544 12 6.51031 12H13.5017C14.4403 12 15.2844 11.4399 15.633 10.5856L17.8891 5.05708C18.2911 4.07179 17.5507 3 16.4682 3H3.74703L3.34824 1.63188C3.0667 0.665955 2.166 0 1.14114 0H0.765144ZM5.77461 9.95604L4.18425 4.5H16.4682L14.2121 10.0286C14.096 10.3133 13.8145 10.5 13.5017 10.5H6.51031C6.16869 10.5 5.86846 10.278 5.77461 9.95604Z" fill="#1F1F21"/>
                        <path d="M6.88631 18C8.15405 18 9.18175 16.9926 9.18175 15.75C9.18175 14.5074 8.15405 13.5 6.88631 13.5C5.61858 13.5 4.59088 14.5074 4.59088 15.75C4.59088 16.9926 5.61858 18 6.88631 18ZM6.88631 16.5C6.46374 16.5 6.12117 16.1642 6.12117 15.75C6.12117 15.3358 6.46374 15 6.88631 15C7.30889 15 7.65146 15.3358 7.65146 15.75C7.65146 16.1642 7.30889 16.5 6.88631 16.5Z" fill="#1F1F21"/>
                        <path d="M13.0075 18C14.2752 18 15.3029 16.9926 15.3029 15.75C15.3029 14.5074 14.2752 13.5 13.0075 13.5C11.7397 13.5 10.712 14.5074 10.712 15.75C10.712 16.9926 11.7397 18 13.0075 18ZM13.0075 16.5C12.585 16.5 12.2423 16.1642 12.2423 15.75C12.2423 15.3358 12.585 15 13.0075 15C13.43 15 13.7726 15.3358 13.7726 15.75C13.7726 16.1642 13.43 16.5 13.0075 16.5Z" fill="#1F1F21"/>
                    </svg>
                    <span className="header-nav__el-text">Корзина</span>
                </li>
            </>
        );
    }


    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__wrapper-left header-left">
                    <svg className="header-left__logo" onClick={() => navigate('/')} height="30" viewBox="0 0 110 30" width="110">
                        <path d="M80.2694 13.7143C80.2694 8.91384 80.2694 6.51361 81.1952 4.68008C82.0096 3.06726 83.3091 1.756 84.9074 0.93423C86.7245 0 89.1032 0 93.8605 0H96.4088C101.166 0 103.545 0 105.362 0.93423C106.96 1.756 108.26 3.06726 109.074 4.68008C110 6.51361 110 8.91384 110 13.7143V16.2857C110 21.0862 110 23.4864 109.074 25.3199C108.26 26.9327 106.96 28.244 105.362 29.0658C103.545 30 101.166 30 96.4088 30H93.8605C89.1032 30 86.7245 30 84.9074 29.0658C83.3091 28.244 82.0096 26.9327 81.1952 25.3199C80.2694 23.4864 80.2694 21.0862 80.2694 16.2857V13.7143Z" fill="#1F1F21"/>
                        <path d="M94.7454 25.8849C94.2241 24.4325 93.8891 23.3725 93.7183 22.661C93.0448 19.859 93.0053 17.0605 93.588 14.229C93.6964 13.7265 94.2704 12.164 94.5572 11.6083C94.9462 10.8436 95.8236 9.2682 95.841 9.29021C95.8483 9.30488 95.7312 9.55429 95.5712 9.85139C95.1423 10.673 94.2161 13.246 94.0392 14.1079C93.7213 15.6997 93.612 16.9486 93.6544 18.4762C93.6814 19.2849 93.7812 20.3797 93.8419 20.4567C93.8809 20.5062 94.3101 20.3411 94.5852 20.1632C94.7959 20.022 95.0811 19.6956 95.1525 19.5012C95.1983 19.3765 95.1923 19.3581 95.082 19.3471C95.0155 19.338 94.9657 19.3178 94.9724 19.2995C94.9805 19.2775 95.1893 19.1069 95.436 18.9198C96.0952 18.4228 96.265 18.2027 96.5608 17.5187C96.7277 17.1335 96.7918 16.9245 96.7577 16.9135C96.7236 16.9025 96.6022 16.9043 96.4768 16.9172C95.8522 16.9741 95.8578 16.9759 96.1762 16.853C96.6855 16.6604 97.036 16.2771 97.25 15.6774C97.3497 15.406 97.351 15.4023 97.2221 15.4592C96.8873 15.6096 96.8572 15.5876 97.1433 15.3968C97.3792 15.2391 97.4805 15.1364 97.5552 14.9677C97.6137 14.843 97.6401 14.7366 97.6174 14.7293C97.5946 14.7219 97.4938 14.7715 97.3876 14.8356C97.2814 14.8998 97.0979 14.9842 96.9828 15.0209L96.7665 15.0906L97.0359 14.9109C97.692 14.4744 97.9427 14.1204 98.1397 13.3593L98.2576 12.9174L98.0833 12.9596C97.9862 12.9816 97.8064 13.0384 97.6929 13.088C97.3929 13.2127 97.4345 13.1687 97.8617 12.8881C98.3894 12.5414 98.6803 12.303 98.8763 12.0462C99.078 11.7913 99.1824 11.5419 99.1028 11.5162C99.0062 11.4851 97.9704 11.6062 97.4962 11.7034C97.2359 11.7548 97.0331 11.7878 97.0385 11.7731C97.0533 11.7328 97.7182 11.4797 98.3178 11.2834C98.9441 11.0834 99.1008 11.0027 99.2442 10.8028C99.3325 10.6836 99.5701 9.74285 99.6123 9.33389L99.628 9.18718L98.8495 9.40365L99.0941 9.25692C99.4589 9.04232 99.81 8.69203 99.974 8.38393C100.055 8.23354 100.102 8.10517 100.085 8.09967C100.068 8.09417 99.905 8.15653 99.7158 8.23907C99.3823 8.38581 98.813 8.5344 98.7797 8.48672C98.7653 8.47389 98.9231 8.37301 99.1218 8.2648C100.164 7.69438 100.231 7.59718 100.129 6.87098L100.063 6.41069L99.8975 6.44738L99.7301 6.48774L99.8228 6.37403C100.034 6.12645 100.103 5.767 100.027 5.22969C99.9911 4.94728 99.9564 4.6612 99.9622 4.59335L99.9629 4.47048L99.2533 4.67227C98.4369 4.90524 98.025 5.09232 97.5512 5.44813C97.3672 5.58569 97.197 5.70307 97.1715 5.70307C97.1461 5.70307 97.2063 5.5912 97.3026 5.44999C97.4047 5.31061 97.4773 5.18223 97.4629 5.1694C97.4239 5.11988 96.5195 5.40238 96.3492 5.51976C96.1204 5.67566 96.0142 5.98192 95.9801 6.61093C95.9623 6.88418 95.941 7.11525 95.9283 7.11525C95.9142 7.11892 95.859 6.87135 95.8056 6.56694C95.7536 6.25885 95.6938 5.98928 95.6778 5.96361C95.6431 5.9196 94.6273 6.45334 94.322 6.67893C94.1226 6.82382 94.1033 6.92835 94.1865 7.32446C94.2216 7.47116 94.235 7.59036 94.2209 7.59403C94.2055 7.60137 94.0964 7.50052 93.9813 7.38132C93.8676 7.25847 93.7628 7.16312 93.7545 7.16862C93.6634 7.20897 93.5148 7.35386 93.4865 7.43088C93.4677 7.48223 93.531 7.70779 93.621 7.92968C93.7168 8.1534 93.7762 8.32028 93.7562 8.30561C93.7361 8.29094 93.656 8.23226 93.5745 8.17725C93.4043 8.05257 93.3578 8.05807 93.3902 8.21211C93.4076 8.32031 93.4063 8.32398 93.3088 8.2433C93.0565 8.03059 92.9951 7.99025 92.9516 8.00492C92.8434 8.03978 92.189 8.88707 92.1162 9.08514C92.0637 9.22818 92.0996 9.4244 92.3402 10.257C92.441 10.6054 92.5231 10.9355 92.5269 10.9941C92.53 11.0895 92.5143 11.0803 92.3984 10.9116C92.3331 10.8126 92.1383 10.4954 91.9751 10.213C91.8133 9.9269 91.6651 9.69035 91.6424 9.68302C91.5856 9.66468 91.4037 10.004 91.1066 10.6917C90.8108 11.3757 90.7685 11.6985 90.9124 12.1716C91.0039 12.476 91.0865 12.5971 91.7194 13.3305C91.9545 13.6074 92.1682 13.8733 92.1874 13.9247C92.2067 13.976 91.916 13.7468 91.5242 13.3947C91.1368 13.0482 90.8044 12.7768 90.7763 12.7841C90.7144 12.797 90.5725 13.7194 90.5569 14.1944C90.5257 14.9885 90.678 15.4561 91.1706 16.0869C91.3657 16.3344 91.5203 16.5361 91.509 16.5325C91.5033 16.5306 91.3203 16.406 91.096 16.2556C90.7187 16.0026 90.6916 15.9897 90.649 16.0539C90.5127 16.252 90.6238 16.8663 90.8662 17.2441C90.9418 17.3669 91.0031 17.477 90.9991 17.488C90.995 17.499 90.8806 17.499 90.7476 17.4806C90.4617 17.4458 90.4328 17.4898 90.5438 17.7759C90.6441 18.0216 90.6482 18.0106 90.4951 17.9776C90.3831 17.9538 90.3907 17.985 90.5718 18.3224C90.6813 18.5259 90.9395 18.9129 91.1475 19.1769C91.4915 19.6244 91.5047 19.6574 91.3481 19.5822L91.18 19.5033L91.2938 19.6262C91.4535 19.7967 91.7997 20.0479 92.1921 20.2771C92.8427 20.6512 92.9313 20.7906 93.0743 21.6121C93.4335 23.644 94.5146 26.6514 94.935 26.7871C94.9747 26.7999 95.0169 26.7889 95.025 26.7669C95.0344 26.7412 94.9074 26.3433 94.7454 25.8849ZM95.9114 9.20218C95.8984 9.18567 95.9049 9.15083 95.9314 9.13065C95.9592 9.10681 95.9722 9.12332 95.9574 9.16366C95.9482 9.20584 95.9231 9.22235 95.9114 9.20218Z" fill="#E1E0E0"/>
                        <path d="M23.7709 10.704C23.7709 17.7394 18.5112 20.0023 12.5175 20.0023H9.09248C8.39933 20.0023 7.86928 20.5371 7.86928 21.2366V28.848C7.86928 29.3829 7.42077 29.8766 6.84994 29.8766H1.01934C0.530055 29.8766 0 29.3417 0 28.848V4.77943C0 3.17486 0.897016 1.98171 2.32409 1.40571C2.73182 1.28229 3.13956 1.2 3.54729 1.2H12.5175C18.9189 1.2 23.7709 3.87428 23.7709 10.704ZM15.8609 10.6629C15.8609 8.31771 14.6377 7.08343 12.3136 7.08343H5.42287C5.62674 7.08343 5.87138 7.12457 6.15679 7.20686C6.44221 7.33029 6.68685 7.45371 6.93149 7.65943C7.42077 8.15314 7.74696 8.60571 7.74696 9.34628V12.8846C7.74696 13.2549 7.86928 13.584 8.15469 13.7897C8.39933 14.0366 8.68475 14.16 9.01093 14.16H12.3136C14.5154 14.16 15.8609 12.9257 15.8609 10.6629Z" fill="#1F1F21"/>
                        <path d="M27.2714 28.8891V4.82057C27.2714 2.80457 28.8208 1.24114 30.8187 1.24114H47.4543C47.9843 1.24114 48.5144 1.776 48.5144 2.31086V6.384C48.5144 6.672 48.392 6.91886 48.1882 7.08343C47.9843 7.28914 47.7397 7.37143 47.4543 7.37143H32.3681C33.5913 7.37143 34.6106 8.35886 34.6106 9.59314V11.3211C34.6106 12.0617 35.1814 12.5966 35.8746 12.5966H44.7224C45.4156 12.5966 45.7825 12.9669 45.7825 13.6663V17.3691C45.7825 18.0686 45.4156 18.4389 44.7224 18.4389H32.3681C33.5097 18.4389 34.6106 19.3851 34.6106 20.5783V22.512C34.6106 22.8 34.7329 23.088 34.9776 23.376C35.1814 23.664 35.5076 23.7874 35.8746 23.7874H47.7804C48.4328 23.7874 48.8406 24.1989 48.8406 24.8571V28.8891C48.8406 29.4651 48.3513 29.9177 47.7804 29.9177H28.2907C27.6791 29.9177 27.2714 29.5063 27.2714 28.8891Z" fill="#1F1F21"/>
                        <path d="M77.4065 29.6709C77.2434 29.8354 77.0395 29.9177 76.7949 29.9177H71.0866C70.3119 29.9177 69.7411 29.5474 69.4149 28.8069L65.2968 20.5783C65.0521 20.1257 64.6852 19.92 64.1959 19.92H58.8138C59.9962 19.92 61.0563 20.8663 61.0563 22.1006V28.8891C61.0563 29.2183 60.9748 29.4651 60.7709 29.6297C60.5671 29.8354 60.3224 29.9177 59.9962 29.9177H54.451C53.8394 29.9177 53.4317 29.5063 53.4317 28.8891V4.82057C53.4317 2.84571 55.0219 1.24114 56.979 1.24114H65.623C71.8205 1.24114 76.9988 3.91543 76.9988 10.6217C76.9988 14.0366 75.694 16.6286 72.6768 18.2743C72.4729 18.4389 72.3506 18.6034 72.3506 18.8091C72.3506 19.0149 72.3914 19.1383 72.4321 19.2617L77.5288 28.6011C77.6104 28.7657 77.6511 28.9303 77.6511 29.0537C77.6511 29.2594 77.5696 29.4651 77.4065 29.6709ZM69.1295 10.5806C69.1295 9.46971 68.8033 8.60571 68.1917 7.98857C67.5393 7.41257 66.6831 7.12457 65.5822 7.12457H58.5692C59.7516 7.12457 60.7709 8.15314 60.7709 9.34628V12.6377C60.7709 13.3371 61.3418 13.9131 62.0349 13.9131H65.5822C67.7432 13.9131 69.1295 12.8434 69.1295 10.5806Z" fill="#1F1F21"/>
                    </svg>
                    <p className="header-left__gender">
                        <span className={classNames("header-left__gender-text", isMale && "active")} onClick={() => onClickGender(true)}>Мужчинам</span>
                        <span className="header-left__gender-text header-left__gender-text--middle">/</span>
                        <span className={classNames("header-left__gender-text", !isMale && "active")} onClick={() => onClickGender(false)}>Женщинам</span>
                    </p>
                </div>
                <ul className="header__wrapper-navigation header-nav">{menuItemsRender()}</ul>
                <div className="header__wrapper-icons header-icons">
                    {!isPWA() && (
                        <svg className="header-icons__cart" onClick={() => navigate('/cart')} height="18" viewBox="0 0 18 18" width="18">
                            <path d="M0.765144 0C0.34257 0 0 0.33579 0 0.75C0 1.16421 0.34257 1.5 0.765144 1.5H1.14114C1.48276 1.5 1.78299 1.72198 1.87684 2.04396L4.3032 10.3681C4.58475 11.334 5.48544 12 6.51031 12H13.5017C14.4403 12 15.2844 11.4399 15.633 10.5856L17.8891 5.05708C18.2911 4.07179 17.5507 3 16.4682 3H3.74703L3.34824 1.63188C3.0667 0.665955 2.166 0 1.14114 0H0.765144ZM5.77461 9.95604L4.18425 4.5H16.4682L14.2121 10.0286C14.096 10.3133 13.8145 10.5 13.5017 10.5H6.51031C6.16869 10.5 5.86846 10.278 5.77461 9.95604Z" fill="#1F1F21"/>
                            <path d="M6.88631 18C8.15405 18 9.18175 16.9926 9.18175 15.75C9.18175 14.5074 8.15405 13.5 6.88631 13.5C5.61858 13.5 4.59088 14.5074 4.59088 15.75C4.59088 16.9926 5.61858 18 6.88631 18ZM6.88631 16.5C6.46374 16.5 6.12117 16.1642 6.12117 15.75C6.12117 15.3358 6.46374 15 6.88631 15C7.30889 15 7.65146 15.3358 7.65146 15.75C7.65146 16.1642 7.30889 16.5 6.88631 16.5Z" fill="#1F1F21"/>
                            <path d="M13.0075 18C14.2752 18 15.3029 16.9926 15.3029 15.75C15.3029 14.5074 14.2752 13.5 13.0075 13.5C11.7397 13.5 10.712 14.5074 10.712 15.75C10.712 16.9926 11.7397 18 13.0075 18ZM13.0075 16.5C12.585 16.5 12.2423 16.1642 12.2423 15.75C12.2423 15.3358 12.585 15 13.0075 15C13.43 15 13.7726 15.3358 13.7726 15.75C13.7726 16.1642 13.43 16.5 13.0075 16.5Z" fill="#1F1F21"/>
                        </svg>
                    )}
                    <div className={classNames("header-icons__burger", popupMenu && "active")} onClick={() => changePopupMenu(prev => !prev)}>
                        <span></span>
                    </div>
                </div>
            </div>
            <div className="header__gender">
                <p className={classNames("header__gender-text", isMale && "active")} onClick={() => onClickGender(true)}>Мужчинам</p>
                <p className={classNames("header__gender-text", !isMale && "active")} onClick={() => onClickGender(false)}>Женщинам</p>
            </div>
            {popupMenuRender()}
        </header>
    );
}
