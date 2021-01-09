import React from 'react';
import {AppRegistry, asset, Pano, Text, View,Model,PointLight,VrButton,AsyncStorage} from 'react-vr';
import House from './components/House';
import StartScreen from './components/StartScreen';
import WinScreen from './components/WinScreen';
import LostScreen from './components/LostScreen';

const handle = 0;

export default class HideAndSeek extends React.Component {

  constructor() {
    super();
      this.state = {
      oneIsShowing: false,
      twoIsShowing: false,
      threeIsShowing: true,
      fourIsShowing: false,
      fiveIsShowing: false,
      score:0,
      timer:20,
      highestScore:0,
      startScreenShowing:true,
      startButtonShowing:true,
      gameWonShowing:false,
      gameLostShowing:false,
      gameIsStarted:false,
      lightIntensity: 2
    };
  }

found(clickedModel)
    {
      if(this.state.gameIsStarted){
      switch (clickedModel) {

        case 1:
        this.setState({
          oneIsShowing: false,
        });
        break;

        case 2:
        this.setState({
          twoIsShowing: false,
        });
        break;

        case 3:
        this.setState({
          threeIsShowing: false,
        });
        break;

        case 4:
        this.setState({
          fourIsShowing: false,
        });
        break;

        case 5:
        this.setState({
          fiveIsShowing: false,
        });
        break;
      }

      let randomModel
      randomModel = Math.floor((Math.random() *5) +1)

      if(randomModel == clickedModel)
      {
        this.found(clickedModel)
      }
      else{
      switch(randomModel)
      {
          case 1:
          this.setState({
            oneIsShowing: true,
          });
          break;

          case 2:
          this.setState({
            twoIsShowing: true,
          });
          break;

          case 3:
          this.setState({
            threeIsShowing: true,
          });
          break;

          case 4:
          this.setState({
            fourIsShowing: true,
          });
          break;

          case 5:
          this.setState({
            fiveIsShowing: true,
          });
          break;
        }}

        this.setState({
          score: this.state.score +1 
        });
      }
    }

    startGame(){

      if(this.state.timer == 0)
      {
        if(this.state.score >= 8)
        {
          this.gameWon();
        }
        else {
          this.gameLost();
        }
        this.setState({timer: 20});
      }
      else {
        this.setState({
          timer: this.state.timer - 1
        });
      }
    }

    gameLost()
  {
    this.setState({
      gameLostShowing: true,
      startButtonShowing: true,
       gameIsStarted:false,
       lightIntensity: 0.5
    });
    clearInterval(handle);
  }

  gameWon()
  {

    if(this.state.score > this.state.highestScore)
    {
      this.setState({highestScore: this.state.score});
      this.setHighestScore(this.state.highestScore);
    }

    this.setState({
      gameWonShowing: true,
      highestScore: this.state.score,
      startButtonShowing: true,
      gameIsStarted:false,
      lightIntensity:4
    });
    clearInterval(handle);
  }

  async setHighestScore(highscore)
  {
    try {
      await AsyncStorage.setItem('storedHighestScore',highscore);
    } catch (error) 
    {
      // handle errors
      console.log(error);
    }
  }

  async gethighestScore(){

    try
    {
         const fetchedHighestScores = await AsyncStorage.getItem('storedHighestScore');

      if (fetchedHighestScores !== null) {
       this.setState({highestScore: fetchedHighestScores});
     }

    } catch (error) 
    {
      // handle errors
      console.log(error);
    }
  }

    startGameVisuals(){
      this.setState({
      startScreenShowing: false,
      gameWonShowing: false,
      gameLostShowing: false,
      startButtonShowing: false,
      score: 0,
      gameIsStarted:true,
      lightIntensity:2
    });

      handle = setInterval(() => this.startGame(), 1000);
    }

    componentDidMount() {
    this.gethighestScore();
  }

  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>

       <View style={{
          height: 1.3,
          width: 2,
          transform: [
            {translate: [-1, 0.5, -2]}
          ],
          backgroundColor: '',
        }}>

        <Text style={{color: 'orange', textAlign: 'center'}}>
        {`Current Scores - ${this.state.score}`}
        </Text>

        <Text style={{color: 'skyblue', textAlign: 'center'}}>
            {`Time Left - ${this.state.timer}`}
          </Text>

          <Text style={{color: 'pink', textAlign: 'center'}}>
            {`Highest Scores - ${this.state.highestScore}`}
          </Text>

        {this.state.startScreenShowing && <StartScreen/>}
        {this.state.gameWonShowing && <WinScreen/>}
          {this.state.gameLostShowing && <LostScreen/>}

        {this.state.startButtonShowing && <VrButton onClick={() => this.startGameVisuals()} style= {{
          transform: [{translate: [0.7, -0.05, 0]},],
          width: 0.6,
          backgroundColor: '#CF3C7E',
          fontSize: 0.1,
        }}>
            <Text style= {{textAlign: 'center',}}>
              Click To Play
            </Text>
        </VrButton>
      }

        </View>

        <PointLight
        style={{
          color: 'white',
          transform: [
            {translate: [0, -0.5, 0]},
          ]
        }}
        intensity = {this.state.lightIntensity}
        />

        {this.state.oneIsShowing && <VrButton onClick={() => this.found(1)}>
        <Model
        source={{obj: asset('Robot.obj'), mtl: asset('Robot.mtl')}}
        lit
        style={{
          transform: [
            {translate: [2.9, -0.6, -0.9]},
            {scale: [0.4, 0.4, 0.4]},
            {rotateY: -65}
          ]
        }}
        />
        </VrButton>}

        {this.state.twoIsShowing && <VrButton onClick={() => this.found(2)}>
        <Model
        source={{obj: asset('Robot.obj'), mtl: asset('Robot.mtl')}}
        lit
        style={{
          transform: [
            {translate: [3, -0.6, 2.6]},
            {scale: [0.4, 0.4, 0.4]},
            {rotateY: -135}
          ]
        }}
        />
        </VrButton>}

        {this.state.threeIsShowing && <VrButton onClick={() => this.found(3)}>
        <Model
        source={{obj: asset('Robot.obj'), mtl: asset('Robot.mtl')}}
        lit
        style={{
          transform: [
            {translate: [-1.2, -1.5, 4.9]},
            {scale: [0.5, 0.5, 0.5]},
            {rotateY: 175}
          ]
        }}
        />
        </VrButton>}

        {this.state.fourIsShowing && <VrButton onClick={() => this.found(4)}>
        <Model
        source={{obj: asset('Robot.obj'), mtl: asset('Robot.mtl')}}
        lit
        style={{
          transform: [
            {translate:[-3, -0.6, 2.5]},
            {scale: [0.4, 0.4, 0.4]},
            {rotateY: 120}
          ]
        }}
        />
        </VrButton>}

        {this.state.fiveIsShowing && <VrButton onClick={() => this.found(5)}>
        <Model
        source={{obj: asset('Robot.obj'), mtl: asset('Robot.mtl')}}
        lit
        style={{
          transform: [
            {translate: [-3, -0.6, -2.5]},
            {scale: [0.4, 0.4, 0.4]},
            {rotateY: 75}
          ]
        }}
        />
        </VrButton>}

        
        {true && <House/>}
      </View>
    );
  }
};

AppRegistry.registerComponent('HideAndSeek', () => HideAndSeek);

