import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'white',
        backgroundColor: 'rgb(27, 32, 57)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));

export default function CustomizedMenus({ dataMenu, mainIcon, mainIconSVG, onClick }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        onClick()
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableElevation
                sx={{ color: 'white', fontSize: '20px' }}
                onClick={handleClick}
            >
                {mainIconSVG ? <div className={cx("icon")} >{mainIconSVG}</div> : <FontAwesomeIcon icon={mainIcon} />}
            </Button>

            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {Array.isArray(dataMenu) && dataMenu?.map((item, index) => (
                    <MenuItem onClick={handleClose} disableRipple key={index}>
                        {item?.iconSVG ?
                            <div className={cx("icon")} >{item?.iconSVG}</div>
                            : item?.icon ?
                                <FontAwesomeIcon className={cx("icon")} icon={item?.icon} />
                                : ""

                        }
                        <div className={cx("text")}>{item.title}</div>
                    </MenuItem>
                ))}

            </StyledMenu>
        </div>
    );
}
