import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    diplay: 'flex',
    flex: '1 1 auto',
    padding: '3rem 12rem'
  },
  paper: {
  	backgroundColor: '#ffffff',
  	borderRadius: 10,
  	marginTop: -10
  },
}));

const NewButton = withStyles((theme) => ({
  root: {
  	fontSize: 12,
    color: 'white',
    borderRadius: 10,
    backgroundColor: '#A10081',
    '&:hover': {
      backgroundColor: '#B11091',
    },
  },
}))(Button);

const ViewButton = withStyles((theme) => ({
  root: {
    color: '#A10081',
    border: '1px solid #A10081',
    borderRadius: 10,
    fontWeight: 'bold',
    margin: 'auto',
    '&:hover': {
    },
  },
}))(Button);

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 5,
    '& > span': {
      maxWidth: 100,
      width: '100%',
      height: 10,
      backgroundColor: '#A10081',
	    borderRadius: 5,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#000',
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
      color: '#A10081'
    },
    '&$selected': {
      color: '#A10081',
    },
  },
  selected: {}
}))((props) => <Tab disableRipple {...props} />);

const options = ['facebook', 'youtube', 'tiktok'];

function Publications () {
	const classes = useStyles();

	const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

	return (
		<div className="w-full">
			<div className="flex flex-1 flex-col min-w-0 container sm:p-8">
				<div className="flex justify-between p-40">
					<Typography className="text-36 font-600">
						Publications
					</Typography>
					<StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
	          <StyledTab label="Published" />
	          <StyledTab label="Scheduled" />
	          <StyledTab label="Drafts" />
	          <StyledTab label="Waiting" />
	        </StyledTabs>
		      <NewButton variant="contained" className="text-14 h-40">+ New Post</NewButton>
	      </div>

	      <div className="flex flex-row px-40">
	      	<ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
	          <Button onClick={handleClick}>Filtered by: {options[selectedIndex]}</Button>
	          <Button
	            color="primary"
	            size="small"
	            aria-controls={open ? 'split-button-menu' : undefined}
	            aria-expanded={open ? 'true' : undefined}
	            aria-label="select merge strategy"
	            aria-haspopup="menu"
	            onClick={handleToggle}
	          >
	            <ArrowDropDownIcon />
	          </Button>
	        </ButtonGroup>
	        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
	          {({ TransitionProps, placement }) => (
	            <Grow
	              {...TransitionProps}
	              style={{
	                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
	              }}
	            >
	              <Paper style={{position: 'absolute', zIndex: 9999}}>
	                <ClickAwayListener onClickAway={handleClose}>
	                  <MenuList id="split-button-menu">
	                    {options.map((option, index) => (
	                      <MenuItem
	                        key={option}
	                        disabled={index === 2}
	                        selected={index === selectedIndex}
	                        onClick={(event) => handleMenuItemClick(event, index)}
	                      >
	                        {option}
	                      </MenuItem>
	                    ))}
	                  </MenuList>
	                </ClickAwayListener>
	              </Paper>
	            </Grow>
	          )}
	        </Popper>
	      </div>

	      <div className={classes.root}>
					<GridList cellHeight={'auto'} cols={3} spacing={24}>
						{_.times(6, () => (
    					<GridListTile cols={1}>
	    					<div>
									<img 
										src="/material-ui-static/images/cards/contemplative-reptile.jpg" 
										style={{
											borderRadius: '10px 10px 0 0',
										}}
										alt="pic"
									/>
				          <Paper className={classes.paper} variant="outlined">
					          <Typography className="flex flex-row p-16 pt-24 pb-8">
					          	Social networks:
											<img 
												className="min-w-20" 
												src={`assets/images/icons/f.svg`} 
												style={{
													backgroundColor: '#1877F2', 
													borderRadius: "50%",
													width: "20px",
													height: "20px",
													padding: "2px",
													marginLeft: 5
												}} 
												alt="facebook" 
											/>
					          </Typography>
					          <div className="flex flex-row p-16 pt-0">
					          	<Button style={{color: "green", borderRadius: "50%"}}>
					          		Published
					        		</Button>
						          <Typography className="font-bold py-8">
						          	Jan 29, 2020 at 7:30 am
						          </Typography>
					          </div>
					          <div className="flex justify-center pb-20">
						          <ViewButton>View publication report</ViewButton>
					          </div>
				          </Paper>
			          </div>
		          </GridListTile>
						))}
		      </GridList>
	      </div>
			</div>
		</div>
	)
}

export default Publications;