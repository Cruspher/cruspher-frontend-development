import React from "react";
import { useIntl } from "react-intl";
import { FormikField } from "../../cruspher-ui/formik/formik-field";
import c from "./style.module.scss";
import { APPRoutes } from "../../../const/APP-routes";

const Register = ({ form, isChecked, setIsChecked }) => {
	const intl = useIntl();

	return (
		<div className={c.container}>
			<FormikField
				placeholder={intl.formatMessage({ id: "login_name" })}
				form={form}
				value={form.values.login}
				name="login"
				submit={form.handleChange}
			/>
			<FormikField
				placeholder={intl.formatMessage({ id: "name" })}
				form={form}
				name="name"
				submit={form.handleChange}
				value={form.values.name}
			/>
			<FormikField
				placeholder={intl.formatMessage({ id: "surname" })}
				form={form}
				value={form.values.surname}
				name="surname"
				submit={form.handleChange}
			/>
			<FormikField
				placeholder={intl.formatMessage({ id: "email" })}
				form={form}
				value={form.values.email}
				name="email"
				submit={form.handleChange}
			/>
			<FormikField
				type="password"
				placeholder={intl.formatMessage({ id: "password" })}
				form={form}
				value={form.values.password}
				name="password"
				submit={form.handleChange}
			/>
			<FormikField
				type="password"
				placeholder={intl.formatMessage({ id: "confirm_password" })}
				form={form}
				value={form.values.confirmPassword}
				name="confirmPassword"
				submit={form.handleChange}
			/>

			<div className={c.privacy}>
				<input
					type="checkbox"
					checked={isChecked}
					onChange={({ target }) => setIsChecked(target.checked)}
				/>
				<a href={APPRoutes.privacy} target="_blank" rel="noreferrer">
					<span className={c.privacyText}>
						{intl.formatMessage({ id: "privacy_policy" })}
					</span>
				</a>
			</div>
		</div>
	);
};

export { Register };
