import NavBar from "./NavBar";
import '../styles/PageContent.css';
import ManageCampaigns from "./ManageCampaigns";
import {LanguageProvider} from "../context/LanguageContext";
import { useState } from "react";

//PageContent represents the whole page of our SIngle Page Application
export default function PageContent(props){

    const [language, setLanguage] = useState('english'); //state to set the initial language i.e. english
    //Using Context to set and change language on App Level
    return(
        <div>
            <LanguageProvider value={{language, setLanguage}}>
                <NavBar/>
                <ManageCampaigns />
            </LanguageProvider>
        </div>
    );
}