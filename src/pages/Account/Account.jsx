import {useContext, useEffect, useReducer} from "react";
import {useNavigate} from "react-router-dom";
import {isMobile} from "react-device-detect";
import classNames from "classnames";

import {useNoScroll, useUserRequest} from "@hooks";
import {appContext} from "@services";
import {fetchUserData} from "@api";
import {
    AuthPopup,
    Error,
    ErrorPopup,
    Footer,
    Header,
    SearchBar,
    UserData
} from "@components";

import "./Account.style.scss";


export default function Account() {
    const {isRegisteredUser, setErrorPopup} = useContext(appContext);
    const [dataPopup, setDataPopup] = useReducer(prev => !prev, false);
    const navigate = useNavigate();

    const {requestData: {error, data, status}} = useUserRequest(fetchUserData, localStorage.getItem('accessToken'), isRegisteredUser, setErrorPopup);

    useNoScroll(dataPopup);

    useEffect(() => {document.title = 'Мои данные';}, []);
    
    
    return (
        <>
            <Header/>
            <SearchBar/>
            <div className="content">
                {status !== 'error' ? (
                    <div className="content__account">
                        <div className="content__account-panel account-navbar">
                            <h6 className="account-navbar__item account-navbar__item--active">Мои данные</h6>
                            <h6 className="account-navbar__item">Мои заказы</h6>
                        </div>
                        {isMobile ? (
                            <div className={classNames("content__account-blackout blackout", dataPopup && "active")}>
                                <div className={classNames("content__account-data user-data", dataPopup && "active")}>
                                    {status === 'complete' && <UserData {...data} setDataPopup={setDataPopup}/>}    
                                </div>
                            </div>
                        ) : (
                            <div className={classNames("content__account-data user-data", dataPopup && "active")}>
                                {status === 'complete' && <UserData {...data} setDataPopup={setDataPopup}/>}    
                            </div>
                        )}
                        <div className="content__account-info account-info" onClick={setDataPopup}>
                            <svg className="account-info__icon" height="60" viewBox="0 0 60 60" width="60">
                                <circle cx="30" cy="30" r="30" fill="#1F1F21"/>
                                <path d="M29.6927 53.983C28.6141 50.8576 27.9205 48.5786 27.5664 47.051C26.1695 41.035 26.0786 35.0535 27.2691 29.0276C27.4905 27.9584 28.6675 24.6438 29.2562 23.4685C30.0547 21.8507 31.8565 18.5214 31.8923 18.5691C31.9074 18.6008 31.6672 19.1288 31.3387 19.7569C30.458 21.4945 28.5592 26.9535 28.1979 28.7879C27.5486 32.1759 27.3277 34.8399 27.4205 38.1059C27.4788 39.8352 27.6881 42.1788 27.8133 42.3459C27.8938 42.4534 28.7772 42.1187 29.3431 41.7501C29.7767 41.4572 30.3629 40.7717 30.5093 40.3593C30.6033 40.0947 30.5909 40.0553 30.3636 40.0272C30.2265 40.0048 30.1239 39.9596 30.1378 39.9207C30.1543 39.874 30.5838 39.5183 31.0912 39.129C32.4472 38.0946 32.7962 37.6315 33.4031 36.1823C33.7455 35.3663 33.8768 34.9223 33.8066 34.8974C33.7363 34.8724 33.4863 34.8713 33.2279 34.8934C31.9417 34.9887 31.9534 34.9929 32.6088 34.7437C33.6569 34.3536 34.3775 33.5493 34.8161 32.2768C35.0206 31.7011 35.0233 31.6933 34.758 31.8094C34.0689 32.1166 34.0069 32.0684 34.5956 31.6728C35.0808 31.3457 35.2891 31.1305 35.4424 30.7731C35.5625 30.5091 35.6164 30.2829 35.5696 30.2663C35.5228 30.2497 35.3153 30.3513 35.0968 30.484C34.8783 30.6167 34.5006 30.7892 34.2636 30.8628L33.8185 31.0026L34.3727 30.6299C35.7223 29.7247 36.2376 28.979 36.6407 27.361L36.882 26.4215L36.523 26.5043C36.3232 26.5473 35.9532 26.6612 35.7196 26.7623C35.1021 27.0162 35.1876 26.9239 36.0665 26.3422C37.1521 25.6237 37.7505 25.1265 38.1533 24.5861C38.5679 24.0499 38.7819 23.5213 38.618 23.4631C38.419 23.3924 36.286 23.6076 35.3097 23.7955C34.7737 23.8943 34.3562 23.9563 34.3672 23.9252C34.3976 23.8396 35.7662 23.3267 37.0003 22.9325C38.2896 22.5317 38.6121 22.3658 38.9067 21.9447C39.0881 21.6937 39.5742 19.6934 39.6598 18.8213L39.6918 18.5084L38.8904 18.7233L38.089 18.9382L38.5922 18.635C39.3428 18.1918 40.0647 17.458 40.4015 16.8066C40.5671 16.4886 40.6638 16.2163 40.6287 16.2038C40.5936 16.1914 40.2587 16.3178 39.8693 16.4862C39.1829 16.7857 38.0109 17.0792 37.9421 16.976C37.9125 16.9479 38.2371 16.739 38.6458 16.5161C40.79 15.3411 40.9287 15.1363 40.7166 13.5802L40.579 12.5939L40.2373 12.6653L39.8928 12.7445L40.0831 12.5054C40.5183 11.9853 40.6582 11.2201 40.5001 10.0687C40.4249 9.46375 40.3524 8.85099 40.3643 8.70625L40.3652 8.44372L38.9044 8.84502C37.2238 9.30846 36.3762 9.69089 35.4014 10.4312C35.0229 10.7174 34.6728 10.9611 34.6204 10.96C34.5681 10.959 34.6916 10.7224 34.8896 10.4247C35.0993 10.1312 35.2483 9.85994 35.2187 9.83191C35.1382 9.72447 33.2764 10.29 32.9262 10.5337C32.4554 10.8572 32.2378 11.5071 32.1697 12.8498C32.134 13.4329 32.0908 13.9258 32.0647 13.9253C32.0357 13.9325 31.9212 13.4012 31.8102 12.7484C31.702 12.0879 31.5778 11.5094 31.5448 11.4538C31.4733 11.3583 29.3829 12.4561 28.7549 12.9253C28.3447 13.2265 28.3052 13.449 28.478 14.2989C28.5508 14.6139 28.5788 14.8692 28.5498 14.8764C28.5181 14.8915 28.2931 14.6714 28.0557 14.4118C27.821 14.1445 27.6049 13.9363 27.5877 13.9477C27.4002 14.0301 27.0947 14.3335 27.0367 14.4969C26.9981 14.6058 27.1292 15.0905 27.3154 15.5684C27.5134 16.0505 27.6363 16.4096 27.595 16.3774C27.5537 16.3452 27.3885 16.2164 27.2205 16.0955C26.8695 15.8219 26.7737 15.8317 26.8409 16.1622C26.8772 16.3941 26.8744 16.4019 26.6735 16.2254C26.1531 15.7602 26.0264 15.6715 25.9369 15.701C25.7143 15.7709 24.3693 17.5539 24.2201 17.974C24.1124 18.2775 24.1871 18.6983 24.6855 20.4875C24.8942 21.2362 25.0644 21.945 25.0726 22.0706C25.0793 22.2745 25.0469 22.2542 24.8075 21.8889C24.6727 21.6745 24.2704 20.9884 23.9334 20.3781C23.5992 19.76 23.2931 19.2483 23.2463 19.2317C23.1292 19.1901 22.7558 19.9074 22.1462 21.3645C21.5393 22.8137 21.4533 23.5016 21.7513 24.5187C21.9408 25.173 22.1114 25.4351 23.4174 27.0291C23.9025 27.6307 24.3435 28.2078 24.3834 28.3183C24.4232 28.4289 23.8237 27.9269 23.0157 27.1581C22.2166 26.4012 21.531 25.8073 21.4731 25.8218C21.3457 25.8466 21.0566 27.8117 21.026 28.826C20.9645 30.5215 21.2798 31.5271 22.2966 32.8958C22.6991 33.433 23.0184 33.8705 22.9949 33.8622C22.9832 33.8581 22.606 33.5839 22.1434 33.2532C21.3655 32.6966 21.3097 32.668 21.2221 32.8034C20.942 33.2209 21.1729 34.5383 21.6737 35.3557C21.8298 35.6214 21.9563 35.8591 21.948 35.8825C21.9398 35.9058 21.7042 35.901 21.43 35.8562C20.8411 35.7698 20.7818 35.8626 21.0113 36.4786C21.2189 37.0079 21.2271 36.9846 20.9117 36.9076C20.681 36.852 20.6968 36.9189 21.0708 37.6475C21.2971 38.0871 21.8302 38.9247 22.2595 39.4978C22.9695 40.4683 22.997 40.5394 22.6741 40.3722L22.3277 40.1966L22.5624 40.464C22.892 40.8351 23.6058 41.3865 24.4148 41.8927C25.756 42.7194 25.9389 43.021 26.2363 44.7825C26.9831 49.1394 29.22 55.6113 30.0863 55.9189C30.1683 55.948 30.2551 55.9263 30.2717 55.8796C30.291 55.8252 30.028 54.9695 29.6927 53.983ZM32.0371 18.384C32.0103 18.3482 32.0234 18.274 32.0779 18.232C32.1351 18.1822 32.1619 18.218 32.1315 18.3036C32.1129 18.3933 32.0612 18.4276 32.0371 18.384Z" fill="#E1E0E0"/>
                            </svg>
                            {status === 'complete' && (
                                <div className="account-info__text">
                                    <p className="account-info__text--name">{data.fullName.split(' ')?.[1] || ''}</p>
                                    <p className="account-info__text--email">{data.email}</p>
                                </div>
                            )}
                        </div>
                        <div className="content__account-items account-items">
                            <p className="account-items__el">
                                <span className="account-items__el-text">Мои заказы</span>
                                <svg className="account-items__el-icon" height="22" viewBox="0 0 10 22" width="10">
                                    <path d="M0.382399 0.46958C0.137549 0.770342 -1.49012e-07 1.17821 -1.49012e-07 1.60349C-1.49012e-07 2.02876 0.137549 2.43663 0.382399 2.73739L6.84743 10.6763L0.382399 18.6153C0.144488 18.9178 0.0128444 19.3229 0.0158202 19.7434C0.0187959 20.164 0.156153 20.5662 0.398308 20.8636C0.640464 21.1609 0.968042 21.3296 1.31049 21.3333C1.65294 21.3369 1.98285 21.1753 2.22918 20.8831L9.6176 11.8103C9.86245 11.5095 10 11.1016 10 10.6763C10 10.2511 9.86245 9.8432 9.6176 9.54244L2.22918 0.46958C1.98425 0.168908 1.65211 0 1.30579 0C0.959466 0 0.627323 0.168908 0.382399 0.46958Z" fill="#CFCCC7"/>
                                </svg>
                            </p>
                            <p className="account-items__el">
                                <span className="account-items__el-text" onClick={() => navigate('/brands')}>Бренды</span>
                                <svg className="account-items__el-icon" height="22" viewBox="0 0 10 22" width="10">
                                    <path d="M0.382399 0.46958C0.137549 0.770342 -1.49012e-07 1.17821 -1.49012e-07 1.60349C-1.49012e-07 2.02876 0.137549 2.43663 0.382399 2.73739L6.84743 10.6763L0.382399 18.6153C0.144488 18.9178 0.0128444 19.3229 0.0158202 19.7434C0.0187959 20.164 0.156153 20.5662 0.398308 20.8636C0.640464 21.1609 0.968042 21.3296 1.31049 21.3333C1.65294 21.3369 1.98285 21.1753 2.22918 20.8831L9.6176 11.8103C9.86245 11.5095 10 11.1016 10 10.6763C10 10.2511 9.86245 9.8432 9.6176 9.54244L2.22918 0.46958C1.98425 0.168908 1.65211 0 1.30579 0C0.959466 0 0.627323 0.168908 0.382399 0.46958Z" fill="#CFCCC7"/>
                                </svg>
                            </p>
                            <p className="account-items__el" onClick={() => navigate('/about')}>
                                <span className="account-items__el-text">О магазине</span>
                                <svg className="account-items__el-icon" height="22" viewBox="0 0 10 22" width="10">
                                    <path d="M0.382399 0.46958C0.137549 0.770342 -1.49012e-07 1.17821 -1.49012e-07 1.60349C-1.49012e-07 2.02876 0.137549 2.43663 0.382399 2.73739L6.84743 10.6763L0.382399 18.6153C0.144488 18.9178 0.0128444 19.3229 0.0158202 19.7434C0.0187959 20.164 0.156153 20.5662 0.398308 20.8636C0.640464 21.1609 0.968042 21.3296 1.31049 21.3333C1.65294 21.3369 1.98285 21.1753 2.22918 20.8831L9.6176 11.8103C9.86245 11.5095 10 11.1016 10 10.6763C10 10.2511 9.86245 9.8432 9.6176 9.54244L2.22918 0.46958C1.98425 0.168908 1.65211 0 1.30579 0C0.959466 0 0.627323 0.168908 0.382399 0.46958Z" fill="#CFCCC7"/>
                                </svg>
                            </p>
                            <p className="account-items__el" onClick={() => navigate('/help')}>
                                <span className="account-items__el-text">Помощь</span>
                                <svg className="account-items__el-icon" height="22" viewBox="0 0 10 22" width="10">
                                    <path d="M0.382399 0.46958C0.137549 0.770342 -1.49012e-07 1.17821 -1.49012e-07 1.60349C-1.49012e-07 2.02876 0.137549 2.43663 0.382399 2.73739L6.84743 10.6763L0.382399 18.6153C0.144488 18.9178 0.0128444 19.3229 0.0158202 19.7434C0.0187959 20.164 0.156153 20.5662 0.398308 20.8636C0.640464 21.1609 0.968042 21.3296 1.31049 21.3333C1.65294 21.3369 1.98285 21.1753 2.22918 20.8831L9.6176 11.8103C9.86245 11.5095 10 11.1016 10 10.6763C10 10.2511 9.86245 9.8432 9.6176 9.54244L2.22918 0.46958C1.98425 0.168908 1.65211 0 1.30579 0C0.959466 0 0.627323 0.168908 0.382399 0.46958Z" fill="#CFCCC7"/>
                                </svg>
                            </p>
                        </div>
                    </div>
                ) : <Error status={error?.response?.status || 502}/>}
            </div>
            <Footer activePage='profile'/>

            <AuthPopup/>
            <ErrorPopup/>
        </>
    );
}