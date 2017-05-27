/**
 * Created by coin on 25/05/2017.
 */

import React from 'react';

export default class BMPayFinishHeader extends React.Component{
    render(){
        return (
            <div style={styles.main}>
                <img style={styles.img}/>
                <span style={styles.content}>付款成功，打包发货中...</span>
            </div>
        )
    }
}

const styles = {
    main:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        height:100,
        width:'100%',
    },
    img:{

    },
    content:{

    }
}