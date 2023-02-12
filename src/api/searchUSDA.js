import { generateFoodID } from "../store/food/reducer";

export const getUSDASearchProperties = (apiKey, setLoadingStateFunction, updateDataFunction) => {
    return {
        apiKey: apiKey,
        setLoadingStateFunction: setLoadingStateFunction,
        updateDataFunction: updateDataFunction,
        requestArguments: {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
}

export const searchUSDA = (brandName, name, searchProperties, page=1) => {
    searchProperties.setLoadingStateFunction(true);
        
    fetch(
        getSearchURL(
            brandName, 
            name, 
            page, 
            searchProperties
        ),
        searchProperties.requestArguments
    )
    .then((response) => response.json())
    .then((data) => {       
        searchProperties.updateDataFunction({
            pageNumber: data.currentPage,
            totalPages: data.totalPages,
            foods: formatFoodInputs(data.foods)
        })
        searchProperties.setLoadingStateFunction(false);
    });
}

const nutrientMap = {
    1003: 'protine',
    1008: 'calories',
    1005: 'carbs',
    1004: 'fat'
}

const getSearchURL = (brand, description, pageNumber, searchProperties) => {
    let query = []
    if (brand && brand.length > 0) {
        query.push('brandName: "' + brand.toUpperCase() +'"')
    }

    if (description && description.length > 0) {
        query.push('description: ' + description.toUpperCase())
    }

    var url = 'https://api.nal.usda.gov/fdc/v1/foods/search?'

    var params = {
        pageSize: 25,
        api_key: searchProperties.apiKey,
        pageNumber: pageNumber,
        requireAllWords: true,
        query: query.join(' ')
    }
    
    url += new URLSearchParams(params).toString();
    console.log('URL: ', url)
    return url;
}

const getServingSize = (foodInput) => {
    if (foodInput.servingSize) {
        return {
            servingSize: foodInput.servingSize,
            servingSizeUnit: foodInput.servingSizeUnit 
        }
    }

    let foodMeasures = foodInput.foodMeasures.filter(fM => { return fM.rank == 1})
    if (foodMeasures.length == 1) {
        return {
            servingSize: foodMeasures[0].gramWeight,
            servingSizeUnit: 'G'
        }
    }

    return false;
}

const formatFoodInputs = (foods) => {
    return foods.map((food) => {
        let servingInfo = getServingSize(food);

        if (! servingInfo) {
            return false;
        }
        return {
            id: generateFoodID(),
            name: food.lowercaseDescription,
            brandName: food.brandName ? food.brandName : 'Generic',
            servingSize: {
                value: servingInfo.servingSize,
                units: servingInfo.servingSizeUnit.toUpperCase()
            },
            protine: {
                value: 0,
                units: 'G'
            },
            carbs: {
                value: 0,
                units: 'G'
            },
            fat: {
                value: 0,
                units: 'G'
            },
            carbs: {
                value: 0,
                units: 'KCAL'
            },
            ...food.foodNutrients.map(nutrient => {
                if (Object.keys(nutrientMap).indexOf(nutrient.nutrientId.toString()) > -1) {
                    return { 
                        [nutrientMap[nutrient.nutrientId.toString()]]:{
                            value: nutrient.value,
                            units: nutrient.unitName
                        }
                    }
                }
            }).filter(nutrient => {return nutrient})
            .reduce((obj, nutrient) => {
                return {
                    ...obj,
                    ...nutrient
                }
            }, {})
        }
    }).filter(food => { return food});
}