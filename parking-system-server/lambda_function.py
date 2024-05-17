import os
import json
from bson import json_util
from pymongo import MongoClient

print('Loading function')
client = MongoClient("mongodb+srv://svissava:Manojmongo7@cluster0.z8fr6ar.mongodb.net/")


def respond(err, res=None):
    return {
        'statusCode': '500' if err else '200',
        'body': err.message if err else json_util.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
        },
    }


def lambda_handler():

    try:
        database = client.IPS
        collection = database['parking-space']
        spots = list(collection.find({}))
        for spot in spots:

            # Mapping existing keys to new keys
            spot['location'] = str(spot['center_x']) + ', ' + str(spot['center_y'])
            spot['vacant'] = spot.pop('occupancy_stat')

            # Restricting keys
            spot.pop('center_x')
            spot.pop('center_y')
            spot.pop('_id')
            spot.pop('vertices')

            return respond(None, spots)

    except Exception as e:
        print(e)
        return respond("Something went wrong!")

print(lambda_handler())

    
