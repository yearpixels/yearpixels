import React, { Component, Fragment } from 'react';
import './App.css';

import { Grid, withStyles, Checkbox, FormControlLabel, Typography } from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CalendarDays from './Components/CalendarDays'

import { getFeeligns, months, feelingsColors } from './utils'
import { ImportFromFile, SaveToFile, serialize, deserialize } from './utils/io';

const styles = {
  fillAll: {
    height: '100%', 
    width: '100%',
  },
  mainGrid: {
    position: 'absolute', 
  },
  menuGrid:{
    padding: 20,
    zIndex: 2
  },
  autoPadding: {
    padding: 'auto',
  }
}

class Home extends Component {
  state = {}

  componentDidMount = () => {
    const states = new Map([[0, getFeeligns()]])
    this.setState({day: 0, states: states})
  }

  selectDay = (day) => {
    this.setState({day: day})
    if(!this.state.states.has(day)){
      this.setState(state=>({
        states: new Map([...state.states, [day, getFeeligns()]])
      }))
    }
  }

  changeFeel = (feel) => {
    this.setState(state => ({
      states: new Map([
        ...state.states, [
        state.day, new Map([
          ...state.states.get(state.day), 
          [feel, !state.states.get(state.day).get(feel)]
        ])
      ]])
    }))
  }

  loadFromString = (text) => {
    this.setState({states: deserialize(text)})
  }

  serializeStates = () => {
    return serialize(this.state.states)
  }

  render() {
    const { classes } = this.props
    const {day, states} = this.state
    const currentYear = new Date().getFullYear()
    return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={[classes.mainGrid, classes.fillAll].join(' ')}
        >
          <Grid item xs={6} className={classes.fillAll}>
            <Grid 
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.fillAll}
            >
              <CalendarDays days={this.state.states} select={this.selectDay}/>
            </Grid>    
          </Grid>    
          <Grid item xs={6} className={classes.fillAll}>
            <Grid 
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.fillAll}
            >
              <Typography variant="display3" gutterBottom>
                {`Año ${currentYear} en Píxeles`.toUpperCase()}  
              </Typography>
              
              <Typography variant="display1" gutterBottom>
                {`${Math.floor(day/12)+1} de ${months[day % 12]} del ${currentYear}`.toUpperCase()}
              </Typography>

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                style={{width:'auto'}}
              >
              {states && states.has(day) && Array.from(states.get(day)).map(pair => (
                <FormControlLabel
                  key={pair[0]}
                  control={
                    <Checkbox
                      checked={pair[1]}
                      onChange={() => this.changeFeel(pair[0])}
                      value={pair[0]}
                      icon={
                        <CheckBoxOutlineBlankIcon nativeColor={feelingsColors.get(pair[0])}/>
                      }
                      checkedIcon={
                        <CheckBoxIcon nativeColor={feelingsColors.get(pair[0])}/>
                      }
                    />
                  }
                  label={
                    <Typography variant="headline">{pair[0]}</Typography>
                  }
                />
              ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          className={[classes.mainGrid, classes.menuGrid].join(' ')}
        >
          <ImportFromFile trigger={this.loadFromString}>
            <Typography variant="title">
              Cargar
            </Typography>
          </ImportFromFile>
          <br/>
          <SaveToFile getText={this.serializeStates}>
            <Typography variant="title">
              Salvar
            </Typography>
          </SaveToFile>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Home);
