import React, {useContext, useState} from "react";
import "react-toastify/dist/ReactToastify.css";
import {useIntl} from "react-intl";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import image from "../../assets/image/background/field_bg.webp";
import {Login} from "../../components/forms/login";
import {Register} from "../../components/forms/register";
import {loginSchema, registerSchema} from "../../schemas/auth/index";
import {AuthContext} from "../../context/AuthContext";
import {BackgroundLogo} from "../../components/cruspher-ui/background-logo";
import {NeonButton} from "../../components/cruspher-ui/buttons/neon-button";
import {userLoginRequest, userSignUpRequest} from "../../actions/users";
import {Modal} from "../../components/cruspher-ui/modal";
import c from "./style.module.scss";
import logo from "../../assets/image/logos/logo-big.png";
import {GridBox} from "../../components/cruspher-ui/box/grid-box";

const AuthPage = () => {
	const intl = useIntl();
	const [isLoading, setIsLoading] = useState(false);
	const notify = (text) => toast(text);
	const {login} = useContext(AuthContext);
	const [isLogin, setIsLogin] = useState(true);
	const [isSuccessRegisterModalShow, setIsSuccessRegisterModalShow] =
		useState(false);
	const form = useFormik({
		initialValues: {
			name: "",
			surname: "",
			email: "",
			password: "",
			confirmPassword: "",
			login: "",
		},
		validationSchema: isLogin ? loginSchema : registerSchema,
		onSubmit: () => {
			sendData();
		},
	});
	const [isChecked, setIsChecked] = useState(false);

	const toggleClass = isLogin ? c.toggle : `${c.toggle} ${c.toggleLogin}`;
	const toggleText = intl.formatMessage({id: isLogin ? "register" : "login"});
	const buttonText = intl.formatMessage({id: !isLogin ? "register" : "login"});
	const buttonType = !isLogin ? `add` : "add";
	const toggleSuccessRegisterModal = () =>
		setIsSuccessRegisterModalShow(!isSuccessRegisterModalShow);

	const userSignInHandler = async () => {
		setIsLoading(true);

		const isSuccess = await userSignUpRequest({...form.values});
		console.log("🚀 ~ file: index.js:53 ~ isSuccess:", isSuccess);

		if (isSuccess) {
			loginHandler();
            notify(intl.formatMessage({id: "success_register"}));
		} else {
			notify(intl.formatMessage({id: "unknown_error"}));
		}

		setIsLoading(false);
	};

	const toggleIsLogin = () => {
		form.resetForm();
		form.setErrors({});
		setIsLogin(!isLogin);
	};

	const sendData = async () => {
		if (isLoading) return;

		if (!isLogin) {
			userSignInHandler();
		} else {
			loginHandler();
		}
	};

	const loginHandler = async () => {
		setIsLoading(true);
		const data = await userLoginRequest({...form.values});

		if (!!data?.data) {
			login(data.data.accessToken);
		} else {
			notify(intl.formatMessage({id: "unknown_error"}));
		}
		setIsLoading(false);
	};

	const formBlock = isLogin ? (
		<Login form={form} sendData={sendData} />
	) : (
		<Register
			{...{
				isChecked,
				setIsChecked,
				isSuccessRegisterModalShow,
				form,
			}}
		/>
	);

	return (
		<div style={{backgroundImage: `url(${image})`}} className={c.back}>
			<div className={c.wrap}>
				<div className={c.buttonsWrap}>
					<span className={toggleClass} onClick={toggleIsLogin}>
						{toggleText}
					</span>
				</div>

				<GridBox rowGap="30px" width="100%">
					<BackgroundLogo />

					{formBlock}

					<NeonButton
						center={true}
						variant={buttonType}
						submit={() => form.handleSubmit()}
						isDisabled={!isLogin && !isChecked}
					>
						{buttonText}
					</NeonButton>
				</GridBox>

				<div />
			</div>

			{!!isSuccessRegisterModalShow && (
				<Modal type="xs" toggleModal={toggleSuccessRegisterModal}>
					<div className={c.success}>
						<img className={c.successImage} src={logo} alt="success" />
						<div style={{textAlign: "center"}}>
							<h2>{intl.formatMessage({id: "success_register"})}</h2>
							<h3>{intl.formatMessage({id: "confirm_your_email"})}</h3>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};

export {AuthPage};
