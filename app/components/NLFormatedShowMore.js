import React, { useEffect, useState } from 'react'
import { Image, Text, Dimensions, View } from 'react-native'
import ParsedText from 'react-native-parsed-text';
import Colors from '../constants/color';

const NLFormatedShowMore = ({ text = "", style }) => {
    const [maxNumOfLines, setMaxNumOfLines] = useState(3);
    const [numOfLines, setNumOfLines] = useState(null);

    return (
        <ParsedText
            onTextLayout={(e) => {
                if (numOfLines == null) setNumOfLines(e.nativeEvent.lines.length)
                console.log("numOfLines", e.nativeEvent.lines.length)
            }}
            style={[{ marginTop: 10,paddingHorizontal: '5%' }]}
            parse={[
                {
                    pattern: /@[A-Za-z0-9._-]*/,
                    style: { color: Colors.s_blue, fontWeight: 'bold' }
                },
                {
                    pattern: /#(\w+)/,
                    style: { color: Colors.s_blue, fontWeight: 'bold' }
                },
                {
                    pattern: /(NL_SHOW_MORE)/,
                    style: { color: Colors.nl_yellow, fontWeight: 'bold' },
                    renderText: () => "Show More",
                    onPress: () => {
                        setMaxNumOfLines(numOfLines)
                    }
                }
            ]}
        >
            {numOfLines > maxNumOfLines ? text.slice(0, 100) + "... " + "NL_SHOW_MORE" : text}
        </ParsedText>
    );
}

export default NLFormatedShowMore;
