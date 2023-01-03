import Cookies from "js-cookie";
import publicClient from "../../api/client/PublicClient";
import {
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    CLEAR_ERRORS,
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
} from "../constans/userConstans";

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const data = await publicClient.post(
            `/api/v2/login`, { email, password },
            config
        );
        Cookies.set("auth_token", data.token || null);
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.message });
    }
};

// Register
export const register = (userData) => async(dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const data = await publicClient.post(
            `/api/v2/registration`,
            userData,
            config
        );

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.message,
        });
    }
};

// Load User
export const loadUser = () => async(dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        // eslint-disable-next-line
        const config = { headers: { "Content-Type": "application/json" } };

        const data = await publicClient.get(`/api/v2/me`);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error,
        });
    }
};

// Log out user
export const logout = () => async(dispatch) => {
    try {
        await publicClient.get(`/api/v2/logout`);

        Cookies.remove("auth_token");
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.message });
    }
};
// Update Profile
export const updateProfile = (userData) => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const data = await publicClient.put(
            `/api/v2/me/update/info`,
            userData,
            config
        );

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.message,
        });
    }
};

// Update Password
export const updatePassword = (password) => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const data = await publicClient.put(
            `/api/v2/me/update`,
            password,
            config
        );

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.message,
        });
    }
};

// get All Users
export const getAllUsers = () => async(dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const data = await publicClient.get(`/api/v2/admin/users`);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.message,
        });
    }
};

// Forgot Password
export const forgotPassword = (email) => async(dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const data = await publicClient.post(
            `/api/v2/password/forgot`,
            email,
            config
        );

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.message,
        });
    }
};

// Reset Password
export const resetPassword = (token, passwords) => async(dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const data = await publicClient.put(
            `/api/v2/password/reset/${token}`,
            passwords,
            config
        );

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.message,
        });
    }
};

// Delete User ----- Admin
export const deleteUser = (id) => async(dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const data = await publicClient.delete(`/api/v2/admin/user/${id}`);

        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.message,
        });
    }
};

// get  User Details ----- Admin
export const getUserDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const data = await publicClient.get(`/api/v2/admin/user/${id}`);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.message,
        });
    }
};

// Update user ----- Admin
export function updateUser(id, userData) {
    return async(dispatch) => {
        try {
            dispatch({ type: UPDATE_USER_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            const data = await publicClient.put(
                `/api/v2/admin/user/${id}`,
                userData,
                config
            );

            dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
        } catch (error) {
            dispatch({
                type: UPDATE_USER_FAIL,
                payload: error.message,
            });
        }
    };
}
//   Clearing errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};