import {createSlice} from "@reduxjs/toolkit";

export const ownerSocialsSlice = createSlice({
    name: "ownerSocials",
    initialState: {
        socials: {
            facebook: "https://www.facebook.com/ScarletRose",
            instagram: "https://www.instagram.com/ScarletRose",
            twitter: "https://twitter.com/ScarletRose",
            pinterest: "https://pinterest.com/ScarletRose",
        },
        contacts: {
            email: "support@scarletrose.com",
            phone: "+1234567890"
        }
    },
    reducers: {
        setOwnerSocials: (state, action) => {
            state.socials = action.payload.socials;
            state.contacts = action.payload.contacts;
        },
        setSocials: (state, action) => {
            state.socials = action.payload;
        },
        setContacts: (state, action) => {
            state.contacts = action.payload;
        }
    }
});
export const { setOwnerSocials, setSocials, setContacts } = ownerSocialsSlice.actions;
export default ownerSocialsSlice.reducer;