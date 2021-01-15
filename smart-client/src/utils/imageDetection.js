export const imageDetect = (response,type) => {

    switch (type) {
        case 1:
            const value1 = response.outputs[0].data.regions[0].region_info.bounding_box;
            if(!value1) {
                alert('No Face Detected');
                return;
            }
            const bounding_Box = faceCalculation(value1);
            return bounding_Box;
        
        case 2:
            const value2 = response.outputs[0].data.regions[0].region_info.bounding_box;
            const celeb = response.outputs[0].data.regions[0].data.concepts[0];
            if(!celeb || !value2){
                alert('No Celebrity Found');
                return;
            }
            const bounding_box1 = faceCalculation(value2);
            return {
                bounding_box1,
                celeb
            }
        case 3:
            const value3 = response.outputs[0].data.regions[0].region_info.bounding_box;
            let demoGraphics = response.outputs[0].data.regions[0].data.concepts
            console.log(demoGraphics);
            if(!demoGraphics || !value3) {
                alert('No DemoGraphics Found');
                return;
            }
            const bounding_Box2 = faceCalculation(value3);

            // To fetch multiple property
            // const allowedValue = new Set(['age_appearance','gender_appearance']);   
            // const demoGraphicsNew = demoGraphics.filter((val) => {
            //     return allowedValue.has(val.vocab_id)
            // })   
            //
            
            const age = demoGraphics.filter((val) => {
                return val.vocab_id === 'age_appearance'
            });
            
            const gender = demoGraphics.filter((val) => {
                return val.vocab_id === 'gender_appearance'
            })
            // const 
            
            //     demoGraphics.forEach((element,index) => {
            //     demoGraphics[index] = (demoGraphics[index]['vocab_id'] === 'age_appearance') ? demoGraphics[index]['age_appearance'] : 'null';
            //     demoGraphics[index] = (demoGraphics[index]['vocab_id'] === 'gender_appearance') ? demoGraphics[index]['gender_appearance'] : 'null';
            // });
            return {
                bounding_Box2,
                age,
                gender
            }

        default:
            break;
    }
}

export const faceCalculation = (value) => {
    // const value = res.outputs[0].data.regions[0].region_info.bounding_box
    // console.log(value);
    if(value === '') {
        alert('No Face Detected');
        return;
    } 
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)

    return {
       top : value.top_row * height,
       left : value.left_col * width,
       bottom : height - (value.bottom_row * height) ,
       right : width - (value.right_col * width)
    }

}