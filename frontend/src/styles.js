
export const uniwersalStyles ={
        desktopContainer:{position : 'relative',display: 'flex', justifyContent: 'center',alignItems: 'center',
            width:'100%',minHeight :'100vh',backgroundColor : 'black',overflow: 'hidden',margin: 0,padding: 0,zIndex :0},
        desktopWrapper: {position: 'relative', width: '100%', maxWidth: '1920px', height: 'auto', display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,},
        desktopBackground :{position: 'relative',fontFamily:'Arial',left :'0%',top :'0%',zIndex: 2},
        menuContainer:{
            display: 'flex',padding: '20px' ,backgroundColor: 'rgba(0, 0, 0, 0.5)',
            direction :'column',
            position:'absolute',left : '0%',top: '0%',width: '100%',height :'7.5%',gap : '4.5%',zIndex : 4},
        menuButton :{
            backgroundColor: 'transparent',
            backdropFilter: 'no blur',
            color :'white',
            fontWeight :'100',
            fontFamily :'"Anonymous Pro", monospace',
            fontSize :'4vw',
            background :'transparent',
            border :"transparent",
            cursor :'pointer',
        },
        activeButton:{
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Bardzo ciemny, ale 80% przezroczystości
            backdropFilter: 'blur(5px)', // Rozmycie tła pod przyciskiem (efekt mrożonego szkła)
            //border: '2px solid white',
            color :'white',
            fontWeight :'700',
            fontFamily :'"Anonymous Pro", monospace',
            fontSize :'4.2vw',
            background :'transparent',
            cursor :'pointer',
        },
}
export default uniwersalStyles;
