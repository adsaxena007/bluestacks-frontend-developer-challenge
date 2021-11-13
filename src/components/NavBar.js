import '../styles/NavBar.css';
import logo from '../images/bluestacks_logo.png';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import { useContext } from 'react';
import LanguageContext from '../context/LanguageContext';


export default function NavBar(props){
    const {language, setLanguage} = useContext(LanguageContext);
    return(
        <div className='app-navbar'>
            <img src={logo} alt='' className='app-logo'/>
            
            <div className='dropdown-div'>
            <Row>
                <Col>
                    <DropdownButton className="dropdown-div-item-btn" variant='dark' title="Language" >
                      <Dropdown.Item href="#" onClick={()=>{setLanguage('english')}}>English</Dropdown.Item>
                      <Dropdown.Item href="#" onClick={()=>{setLanguage('german')}}>German</Dropdown.Item>
                    </DropdownButton>            
                </Col>
                <Col>
                    {language==='english'? <h1 className="dropdown-div-item-lang">🇦🇺</h1>:<h1 className="dropdown-div-item">🇩🇪</h1>}
                </Col>
            </Row>
            </div>
        </div>
        
    );
}