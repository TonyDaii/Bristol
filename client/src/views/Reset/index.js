import "./style.scss";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";

export default function Reset() {

	return (
	
			<div style={{ flex: 1 }}>
				<h1 className="reset-title">Reset password 🔒</h1>
				<p className="reset-instructions">
					Your new password must be different from previously used passwords
				</p>
				<form className="reset-form">
					<p>New password</p>
					<TextField
						type="password"
						name="new-password"
						placeholder="Password"
						size="small"
					/>
					<p>Confirm password</p>
					<TextField
						type="password"
						name="confirm-password"
						placeholder="Password"
						size="small"
					/>
					<Button type="submit" variant="contained" className="reset-submit">
						Set new password
					</Button>
				</form>
				<Box className="reset-create">
					<Link to="/"> {` < Back to login`} </Link>
				</Box>
			</div>
	);
}
