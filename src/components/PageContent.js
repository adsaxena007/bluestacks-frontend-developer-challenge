import NavBar from "./NavBar";
import '../styles/PageContent.css';
import ManageCampaigns from "./ManageCampaigns";
import {LanguageProvider} from "../context/LanguageContext";
import { useState } from "react";

export default function PageContent(props){

    const [language, setLanguage] = useState('english');
    return(
        <div>
            <LanguageProvider value={{language, setLanguage}}>
                <NavBar/>
                <ManageCampaigns />
            </LanguageProvider>
        </div>
    );
}