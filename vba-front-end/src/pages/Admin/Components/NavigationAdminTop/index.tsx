import React, { useState, useEffect } from 'react';
import './style.scss';
// import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

// import PersonIcon from '@mui/icons-material/Person';
// import HomeIcon from '@mui/icons-material/Home';
// import Logout from '@mui/icons-material/Logout';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

type NavigationTopProps = {
	data: any;
};

function NavigationAdminTop({ data }: NavigationTopProps) {
	const navigate = useNavigate();
	const [offset, setOffset] = useState(0);
	const [shadow, setShadow] = useState(0);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleAnchorElMenuAvatar = (event: {
		currentTarget: React.SetStateAction<null>;
	}) => {
		setAnchorEl(event.currentTarget);
	};

	// const handleLogOut = () => {
	// 	Cookies.remove('jwt');
	// 	navigate('/signin');
	// 	window.location.reload();
	// };

	useEffect(() => {
		if (offset !== 0) {
			window.onscroll = () => {
				setOffset(window.pageYOffset);
			};
			setShadow(2);
			console.log('shadow', shadow);
		} else {
			window.onscroll = () => {
				setOffset(window.pageYOffset);
			};
			setShadow(0);
			console.log('shadow', shadow);
		}
	}, [offset]);

	const handleCloseMenuAvatar = () => {
		setAnchorEl(null);
	};

	return (
		<React.Fragment>
			<AppBar
				sx={{ backgroundColor: '#9B2335' }}
				position='sticky'
				elevation={shadow}>
				<Toolbar>
					<Grid container spacing={1} alignItems='center'>
						<Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
							<IconButton color='inherit' aria-label='open drawer' edge='start'>
								{/* <MenuIcon /> */}
							</IconButton>
						</Grid>
						<Grid item xs />
						<Grid item>
							<Tooltip title='Alerts • No alerts'>
								<IconButton color='inherit'>
									{/* <NotificationsIcon /> */}
								</IconButton>
							</Tooltip>
						</Grid>

						<Grid item>
							{/* <IconButton
								onClick={handleAnchorElMenuAvatar}
								color='inherit'
								sx={{ p: 0.5 }}>
								<Avatar
									src='https://hiphop-g28.herokuapp.com/upload/image/1.png'
									alt='My Avatar'
								/>
							</IconButton> */}
						</Grid>
					</Grid>
				</Toolbar>
				{/* <Toolbar className="kz-index">
          <Box className="kz-index" sx={{ width: 'auto' , height: 273}}></Box>
        </Toolbar> */}
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleCloseMenuAvatar}
					onClick={handleCloseMenuAvatar}
					// sx={{ disableScrollLock: true }}
					PaperProps={{
						elevation: 2,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1
							},
							'&:before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 100
							}
						}
					}}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
					<Box sx={{ margin: '12px 0px', padding: '0px 20px' }}>
						<Typography
							sx={{ fontFamily: 'Public Sans, sans-serif', fontWeight: '600' }}
							variant='subtitle1'
							noWrap
							component='h6'>
							{data.name}
						</Typography>
						<Typography
							sx={{ fontFamily: 'Public Sans, sans-serif', color: '#637381' }}
							variant='body2'
							noWrap
							component='p'>
							{data.email}
						</Typography>
					</Box>
					<Divider />
					<MenuItem component={Link} to='/'>
						{/* <HomeIcon sx={{ marginRight: '16px' }} /> Home */}
					</MenuItem>

					{/* <MenuItem onClick={handleLogOut}>
						<ListItemIcon>
							<Logout fontSize='small' />
						</ListItemIcon>
						Logout
					</MenuItem> */}
				</Menu>
			</AppBar>
		</React.Fragment>
	);
}

export default NavigationAdminTop;
