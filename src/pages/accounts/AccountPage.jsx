import React from "react";
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import MainLayout from "../../components/layouts/MainLayout";
import useData from "../../helper/useData";
import ListItemContainer from "../../components/elements/ListItemContainer";
import Wrapper from '../../components/elements/Wrapper';
import PrimaryText from "../../components/elements/Texts/PrimaryText";
import SecondaryText from "../../components/elements/Texts/SecondaryText";
import { showRupiah } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedAccount } from "../../redux/account/accountSlice";
import { setDialogOpen } from "../../redux/dialog/dialogSlice";

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const renderAccountItems = (items, onClick, dispatch) => {
    const ListItemContent = styled('div')({
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBlock: 6,
        minWidth: 0,
        height: 40,
    });

    const wrapperStyle1 = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }

    const handleDeleteAccount = (e, id) => {
        e.stopPropagation();
        dispatch(setDialogOpen({
            type: 'delete-account',
            data: id,
            desc : 'Deleting this will affect the related transaction data'
        }));
    }

    console.log(items);

    return items.map((item, i) => (
        <ListItemContainer key={item.name + i} onClick={() => onClick(item)}>
            <ListItemAvatar>
                <Avatar>
                    <AccountBalanceIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemContent>
                <Wrapper style={wrapperStyle1}>
                    <PrimaryText text={item.name} />
                    <SecondaryText text={showRupiah(item.balance)} />
                </Wrapper>
                <IconButton edge="end" aria-label="delete" onClick={(e) => handleDeleteAccount(e, item.value)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemContent>
        </ListItemContainer>
    ));
}

const AccountPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { accountItems } = useData();
    const [dense] = React.useState(false);

    const handleOnClick = (account) => {
        dispatch(setSelectedAccount(account));
        navigate(`/accounts/${account.name}`)
    }

    return (
        <MainLayout>
            <Grid item xs={12} md={6}>
                <Demo>
                    <List dense={dense}>
                        {renderAccountItems(accountItems, handleOnClick, dispatch)}
                    </List>
                </Demo>
            </Grid>
            <Fab onClick={() => navigate("/accounts/add-account")} color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 30, right: 30 }}>
                <AddIcon sx={{ color: 'white' }} />
            </Fab>
        </MainLayout>
    )
}

export default AccountPage