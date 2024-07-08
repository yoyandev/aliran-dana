/* eslint-disable react/prop-types */
import { styled } from '@mui/material';
import PrimaryText from '../Text/PrimaryText';
import Wrapper from '../Wrapper';
import SecondaryText from '../Text/SecondaryText';
import AmountText from '../Text/AmoutText';

const ListItemTransactionText = ({category}) => {
    const ListItemTransactionText = styled('div')({
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBlock: 6,        
        minWidth: 0,
        height : 40,        
    });

    const wrapperStyle1 = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }

    const wrapperStyle2 = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign : 'end'
    }

    return (
        <ListItemTransactionText>
            <Wrapper style={wrapperStyle1}>
                <PrimaryText text={'Makanan'} />
                <SecondaryText text={'Nasi padang bungo palo'} />
            </Wrapper>
            <Wrapper style={wrapperStyle2}>
                <AmountText
                    text='-10,000'
                    category={category}
                />
                <PrimaryText text={'12:00'} />
            </Wrapper>
        </ListItemTransactionText>
    )
}

export default ListItemTransactionText