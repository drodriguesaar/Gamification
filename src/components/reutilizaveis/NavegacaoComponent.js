import React from 'react';
import { useHistory } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import PremioImg from '../../images/premios_badge.png';
import DesafioImg from '../../images/desafios_badge.png';
import PodiumImg from '../../images/podium_badge.png';
import SairImg from '../../images/sair.png';
import ChatImg from '../../images/chat.png';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Session from 'store2';
import Chaves from '../../chaves.js';

const useStyles = makeStyles({
    root: {
        width: '100%',
        bottom: 0,
        height: 70,
        position: 'fixed',

    },
    button: {
        color: 'purple',
        fontWeight: 'bold'
    }
});

export default function NavegacaoComponent(props) {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = React.useState('ranking');

    const handleChange = (event, newValue) => {

        if (newValue === "logout") {
            Session.remove(Chaves.GameApiStoreKey);
            Session.remove(Chaves.UsuarioStoreKey);
            history.push('/');
            return;
        }
        event.preventDefault();
        setValue(newValue);
        history.push(`/h/app/${newValue}`);
    };

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction key={1} classes={{ selected: classes.button }} label="Ranking" value="ranking" icon={<img src={PodiumImg} alt="desafios" height={36} width={36} />} />
            <BottomNavigationAction key={2} classes={{ selected: classes.button }} label="Premios" value="premios" icon={<img src={PremioImg} alt="prêmios" height={36} width={36} />} />
            <BottomNavigationAction key={3} classes={{ selected: classes.button }} label="Desafios" value="desafios" icon={<img src={DesafioImg} alt="desafios" height={36} width={36} />} />
            <BottomNavigationAction key={3} classes={{ selected: classes.button }} label="Chat" value="chat" icon={<img src={ChatImg} alt="chat" height={36} width={36} />} />
            <BottomNavigationAction key={4} classes={{ selected: classes.button }} label="Perfil" value="perfil" icon={<Avatar src={props.fotoAluno} />} />
            <BottomNavigationAction key={5} classes={{ selected: classes.button }} label="Logout" value="logout" icon={<img src={SairImg} alt="sair" height={36} width={36} />} />
        </BottomNavigation>
    );
}
