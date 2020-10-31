import React from 'react';
import BasicLayout from '../Layouts/BasicLayout';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: "100%",
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  tilebar:{
    padding:"1rem"
  }
}));


const mapStateToProps = (state)=>{
    return {
       examples:state.examples
    }
}

function Examples({examples}){
    const classes = useStyles();

    return(
        <BasicLayout className="bg-light">
              <h3 className="section__title">Примеры моих работ</h3>
              <div className="section__items">
<div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList}>
        {examples.map((tile) => (
          <GridListTile key={tile.image} className={classes.card}>
            <img src={tile.image} alt={tile.title} />
            <GridListTileBar
              className={classes.tilebar}
              title={tile.title}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
              onClick={()=>{window.open(tile.url)}}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
              </div>
        </BasicLayout>
    )
}

export default connect(mapStateToProps)(Examples);