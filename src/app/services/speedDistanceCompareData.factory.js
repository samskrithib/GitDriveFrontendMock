/** Created by Samskrithi on 24/11/2016. */
(function() {
  'use strict';
  angular
  .module('dassimFrontendV03')
  .factory('speedDistanceCompareDataFactory', speedDistanceCompareDataFactory);

  function speedDistanceCompareDataFactory($log, $filter, mathUtilsService) {
        var seriesNameMatchers = [
            "ActualDriving", "actualPosition",  
            "FlatoutDriving", "flatoutPosition", 
            "EcoDriving", "optimalPosition",
            "SpeedLimit", "endPoint", "beginPoint",
            "scaledPosition", "Elevation"
        ];

        var link;        
        var speedRestrictions;
        var driverAdvice;

        var actualSpeed;
        var actualSpeedMph;
        var actualSpeedPosition;
        var actualSpeedPositionM;

        var flatoutSpeed;
        var flatoutSpeedMph;
        var flatoutSpeedPosition;
        var flatoutSpeedPositionM;
        
        var optimalSpeed;
        var optimalSpeedMph;
        var optimalSpeedPosition;
        var optimalSpeedPositionM;

        var speedRestrictionsValue
        var speedRestrictionsPoint
        var speedRestrictionsValueMph
        var speedRestrictionsPointM

        var scaledElevation;
        var scaledElevationPosition;
        var scaledElevationPositionM;
        var dataEntryIterativeCount;


        var link_Array=[];
        var driverAdvices_Array = [];
        var actualSpeed_Array = [];
        var actualSpeedMph_Array = [];
        var actualSpeedPosition_Array = [];
        var actualSpeedPositionM_Array = [];
        var flatoutSpeed_Array = [];
        var flatoutSpeedMph_Array
        var flatoutSpeedPosition_Array = [];
        var flatoutSpeedPositionM_Array
        var optimalSpeed_Array = [];
        var optimalSpeedMph_Array = [];
        var optimalSpeedPositionM_Array = [];
        var optimalSpeedPosition_Array = [];
        var scaledElevation_Array = [];
        var scaledElevationPosition_Array = [];
        var scaledElevationPositionM_Array = [];
        var speedRestrictionsPoints_Array =[];
        var speedRestrictionsPointsM_Array = [];
        var speedRestrictionsValues_Array =[];
        var speedRestrictionsValuesMph_Array =[];
        var speedRestrictionsPointsM_Array =[];
       
        var columnData_Array =[];
        var namesObject ={};
        var speedDistanceData={};
        

        return {
            getSpeedDistanceGraphLabels: function () {
                var graphLabelsAndTitles = {
                    "yAxisLabel": "Speed (Kph)",
                    "graphTitle": "Speed Distance Graph",
                    "seriesLabels": null
                }
                return graphLabelsAndTitles;
            },

            getDataFormat:function(speedDistance_Kph, speedDistance_Mph, linkIndex, graphLinks){
                var modDataForGraph={};
                var sizeOfActualDrivingArray = speedDistance_Kph.actualDriving.length;
                var sizeOfLinksArray = graphLinks.length;
                var numberOfRuns = sizeOfActualDrivingArray/ sizeOfLinksArray;
                var i;
                var linkIndexNo;
                var newLinkIndexArray = [];
                var actualDriving_formatted_Array=[];
                var actualPosition_formatted_Array = [];
                var flatoutDriving_formatted_Array = [];
                var flatoutPosition_formatted_Array = [];
                var ecoDriving_formatted_Array = [];
                var optimalPosition_formatted_Array = [];
                var speedLimit_formatted_Array =[];
                var endpoint_formatted_Array =[];
                var scaledPosition_formatted_Array = [];
                var elevation_formatted_Array = [];
                var link_formatted_Array =[];
                var speedDistance_Kph_Array = speedDistance_Kph;
                var actualDrivingArray = speedDistance_Kph.actualDriving;
                var columnData_Array=[];
                var namesObject={};
                var xsObject={};

                $log.info("the size of Actual Driving Array: " + sizeOfActualDrivingArray);
                $log.info("the number of runs are: " + numberOfRuns);
                $log.info("size of array is " + sizeOfLinksArray);

                //workOutNewLinkIndexes
                for (i=0; i<numberOfRuns; i++){
                    var linkIndexNo = i*(sizeOfLinksArray)+ linkIndex;
                    newLinkIndexArray.push((i*(sizeOfLinksArray)+ linkIndex));
                }
                
                for (i=0; i<newLinkIndexArray.length; i++){
                    linkIndexNo = newLinkIndexArray[i];
                    
                    var actualDriving = actualDrivingArray[linkIndexNo];
                    columnData_Array.push(actualDriving);
                    actualDriving_formatted_Array.push(actualDriving);
                    namesObject[actualDriving_formatted_Array[i][0]] = 'Actual Driving';

                    var actualPosition = speedDistance_Kph_Array.actualPosition[linkIndexNo];
                    columnData_Array.push(actualPosition);
                    actualPosition_formatted_Array.push(actualPosition);

                    var flatoutDriving = speedDistance_Kph_Array.flatoutDriving[linkIndexNo];
                    columnData_Array.push(flatoutDriving);
                    flatoutDriving_formatted_Array.push(flatoutDriving);
                    namesObject[flatoutDriving_formatted_Array[i][0]] = 'Optimal Driving (Flatout)';

                    var flatoutPosition = speedDistance_Kph_Array.flatoutPosition[linkIndexNo];
                    columnData_Array.push(flatoutPosition);
                    flatoutPosition_formatted_Array.push(flatoutPosition);

                    var ecoDriving = speedDistance_Kph_Array.ecoDriving[linkIndexNo];
                    columnData_Array.push(ecoDriving);
                    ecoDriving_formatted_Array.push(ecoDriving);
                    namesObject[ecoDriving_formatted_Array[i][0]] = 'Optimal Driving (Eco)';

                    var optimalPosition = speedDistance_Kph_Array.optimalPosition[linkIndexNo];
                    columnData_Array.push(optimalPosition);
                    optimalPosition_formatted_Array.push(optimalPosition);
                }
                var link = speedDistance_Kph_Array.links[newLinkIndexArray[0]];
                link_formatted_Array.push(link);

                var speedLimit = speedDistance_Kph_Array.speedLimit[newLinkIndexArray[0]];
                columnData_Array.push(speedLimit);
                speedLimit_formatted_Array.push(speedLimit);
                namesObject[speedLimit_formatted_Array[0][0]] = 'Optimal Driving (Eco)';
                

                var endpoint = speedDistance_Kph_Array.endPoint[newLinkIndexArray[0]];
                columnData_Array.push(endpoint);
                endpoint_formatted_Array.push(endpoint);

                var scaledPosition = speedDistance_Kph_Array.scaledPosition[newLinkIndexArray[0]];
                columnData_Array.push(scaledPosition);
                scaledPosition_formatted_Array.push(scaledPosition);

                var elevation = speedDistance_Kph_Array.Elevation[newLinkIndexArray[0]];
                columnData_Array.push(elevation);
                elevation_formatted_Array.push(elevation);

                return modDataForGraph;
                
            },
            

            getDriverAdvice: function(speedDistances){
                var driverAdvice=[];
                driverAdvices_Array=[];
                _.each(speedDistances, function(val, key){
                    var speedDistanceReportPerJourney =speedDistances[key].speedDistanceReportPerJourney;
                    _.each(speedDistanceReportPerJourney, function(val, key2){
                        driverAdvice = speedDistanceReportPerJourney[key2].driverAdvice;
                        driverAdvices_Array.push(driverAdvice);
                    })
                })
                return driverAdvices_Array;
            },

            getSpeedDistanceLinks: function (speedDistances) {
                link_Array=[];
                _.each(speedDistances, function (val, key){
                    link = _.pluck(speedDistances[key].speedDistanceReportPerJourney, 'link'); 
                    link_Array.push(link);
                })
                return link_Array;
            },
            getActualSpeedDistance: function (speedDistances){
                actualSpeed_Array= [];
                actualSpeedPosition_Array = [];
                actualSpeedMph_Array = [];
                actualSpeedPositionM_Array = [];
                dataEntryIterativeCount=0;
                _.each(speedDistances, function (val, key){
                    var speedDistanceReportPerJourney =speedDistances[key].speedDistanceReportPerJourney;
                    _.each(speedDistanceReportPerJourney, function(val, key2){
                        actualSpeed = _.pluck(speedDistanceReportPerJourney[key2].speedDistanceProfiles.actualSpeedAndPositions,'speed');
                        actualSpeedPosition = _.pluck(speedDistanceReportPerJourney[key2].speedDistanceProfiles.actualSpeedAndPositions,'position');
                        
                        actualSpeedPositionM=[];
                        actualSpeedMph=[];
                        
                        mathUtilsService.convertMetersToMiles(actualSpeedPosition, actualSpeedPositionM);
                        mathUtilsService.convertKphtoMph(actualSpeed, actualSpeedMph);

                        actualSpeed.splice(0,0,seriesNameMatchers[0] + dataEntryIterativeCount);
                        actualSpeed_Array.push(actualSpeed);
                        
                        actualSpeedPosition.splice(0,0, seriesNameMatchers[1] + dataEntryIterativeCount);
                        actualSpeedPosition_Array.push(actualSpeedPosition);

                        actualSpeedMph.splice(0,0, seriesNameMatchers[0] + dataEntryIterativeCount);
                        actualSpeedMph_Array.push(actualSpeedMph);

                        actualSpeedPositionM.splice(0,0, seriesNameMatchers[1]+ dataEntryIterativeCount);
                        actualSpeedPositionM_Array.push(actualSpeedPositionM);

                        dataEntryIterativeCount = dataEntryIterativeCount + 1;
                    })

                })
            },

            getFlatoutSpeedDistance: function (speedDistances){
                flatoutSpeed_Array= [];
                flatoutSpeedPosition_Array = [];
                flatoutSpeedMph_Array = [];
                flatoutSpeedPositionM_Array = [];
                dataEntryIterativeCount=0;
                _.each(speedDistances, function (val, key){
                    var speedDistanceReportPerJourney =speedDistances[key].speedDistanceReportPerJourney;
                    _.each(speedDistanceReportPerJourney, function(val, key2){
                        flatoutSpeed = _.pluck(speedDistanceReportPerJourney[key2].speedDistanceProfiles.flatoutSpeedAndPositions,'speed');
                        flatoutSpeedPosition = _.pluck(speedDistanceReportPerJourney[key2].speedDistanceProfiles.flatoutSpeedAndPositions,'position');
                        
                        flatoutSpeedPositionM=[];
                        flatoutSpeedMph=[];
                        
                        mathUtilsService.convertMetersToMiles(flatoutSpeedPosition, flatoutSpeedPositionM);
                        mathUtilsService.convertKphtoMph(flatoutSpeed, flatoutSpeedMph);

                        flatoutSpeed.splice(0,0,seriesNameMatchers[2] + dataEntryIterativeCount);
                        flatoutSpeed_Array.push(flatoutSpeed);
                        
                        flatoutSpeedPosition.splice(0,0, seriesNameMatchers[3] + dataEntryIterativeCount);
                        flatoutSpeedPosition_Array.push(flatoutSpeedPosition);

                        flatoutSpeedMph.splice(0,0, seriesNameMatchers[2] + dataEntryIterativeCount);
                        flatoutSpeedMph_Array.push(flatoutSpeedMph);

                        flatoutSpeedPositionM.splice(0,0, seriesNameMatchers[3] + dataEntryIterativeCount);
                        flatoutSpeedPositionM_Array.push(flatoutSpeedPositionM);

                        dataEntryIterativeCount = dataEntryIterativeCount + 1;
                    })

                })
            },

            getOptimalSpeedDistance: function (speedDistances){
                optimalSpeed_Array= [];
                optimalSpeedPosition_Array = [];
                optimalSpeedMph_Array = [];
                optimalSpeedPositionM_Array = [];
                dataEntryIterativeCount=0;
                _.each(speedDistances, function (val, key){
                    var speedDistanceReportPerJourney =speedDistances[key].speedDistanceReportPerJourney;
                    _.each(speedDistanceReportPerJourney, function(val, key2){
                        optimalSpeed = _.pluck(speedDistanceReportPerJourney[key2].speedDistanceProfiles.optimalSpeedAndPositions,'speed');
                        optimalSpeedPosition = _.pluck(speedDistanceReportPerJourney[key2].speedDistanceProfiles.optimalSpeedAndPositions,'position');
                        
                        optimalSpeedPositionM=[];
                        optimalSpeedMph=[];
                        
                        mathUtilsService.convertMetersToMiles(optimalSpeedPosition, optimalSpeedPositionM);
                        mathUtilsService.convertKphtoMph(optimalSpeed, optimalSpeedMph);

                        optimalSpeed.splice(0,0,seriesNameMatchers[4] + dataEntryIterativeCount);
                        optimalSpeed_Array.push(optimalSpeed);
                        
                        optimalSpeedPosition.splice(0,0, seriesNameMatchers[5] + dataEntryIterativeCount);
                        optimalSpeedPosition_Array.push(optimalSpeedPosition);

                        optimalSpeedMph.splice(0,0, seriesNameMatchers[4] + dataEntryIterativeCount);
                        optimalSpeedMph_Array.push(optimalSpeedMph);

                        optimalSpeedPositionM.splice(0,0, seriesNameMatchers[5] + dataEntryIterativeCount);
                        optimalSpeedPositionM_Array.push(optimalSpeedPositionM);

                        dataEntryIterativeCount = dataEntryIterativeCount + 1;
                    })

                })
            },

            getSpeedRestrictions: function (speedDistances){
                speedRestrictionsValues_Array =[];
                speedRestrictionsPoints_Array =[];

                _.each(speedDistances, function (val, key){
                    var speedDistanceReportPerJourney =speedDistances[key].speedDistanceReportPerJourney;
                    _.each(speedDistanceReportPerJourney, function(val, key2){
                        speedRestrictionsValue = _.pluck(speedDistanceReportPerJourney[key2].speedRestrictions,'value');
                        speedRestrictionsPoint = _.pluck(speedDistanceReportPerJourney[key2].speedRestrictions,'point');

                        speedRestrictionsValueMph =[];
                        speedRestrictionsPointM =[];

                        mathUtilsService.convertKphtoMph(speedRestrictionsValue, speedRestrictionsValueMph);
                        mathUtilsService.convertMetersToMiles(speedRestrictionsPoint, speedRestrictionsPointM);

                        speedRestrictionsValue.splice(0,0,seriesNameMatchers[6] + key2);
                        speedRestrictionsValues_Array.push(speedRestrictionsValue);
                        
                        speedRestrictionsPoint.splice(0,0, seriesNameMatchers[7] + key2);
                        speedRestrictionsPoints_Array.push(speedRestrictionsPoint);

                        speedRestrictionsValueMph.splice(0,0, seriesNameMatchers[6] + key2);
                        speedRestrictionsValuesMph_Array.push(speedRestrictionsValueMph);

                        speedRestrictionsPointM.splice(0,0, seriesNameMatchers[7] + key2);
                        speedRestrictionsPointsM_Array.push(speedRestrictionsPointM);
                    })

                })
            },

            getElevation: function (speedDistances){
                scaledElevation_Array=[];
                scaledElevationPosition_Array=[];
                scaledElevationPositionM_Array=[];

                _.each(speedDistances, function (val, key){
                    var speedDistanceReportPerJourney =speedDistances[key].speedDistanceReportPerJourney;
                    _.each(speedDistanceReportPerJourney, function(val, key2){
                        scaledElevationPosition = _.pluck(speedDistanceReportPerJourney[key2].scaledElevations,'position');
                        scaledElevation = _.pluck(speedDistanceReportPerJourney[key2].scaledElevations,'scaledElevation');
                        
                        scaledElevationPositionM =[];
                        mathUtilsService.convertMetersToMiles(scaledElevationPosition, scaledElevationPositionM);

                        scaledElevationPosition.splice(0,0, seriesNameMatchers[9] + key2);
                        scaledElevationPosition_Array.push(scaledElevationPosition);

                        scaledElevation.splice(0,0,seriesNameMatchers[10] + key2);
                        scaledElevation_Array.push(scaledElevation);

                        scaledElevationPositionM.splice(0,0, seriesNameMatchers[9] + key2);
                        scaledElevationPositionM_Array.push(scaledElevationPositionM);
                    })

                })
            },

            getSpeedDistanceData_Kph : function(){
                return{
                    links: link_Array,
                    actualDriving : actualSpeed_Array,
                    actualPosition : actualSpeedPosition_Array,
                    flatoutDriving : flatoutSpeed_Array,
                    flatoutPosition : flatoutSpeedPosition_Array,
                    ecoDriving : optimalSpeed_Array,
                    optimalPosition : optimalSpeedPosition_Array,
                    speedLimit :  speedRestrictionsValues_Array,
                    endPoint : speedRestrictionsPoints_Array,
                    scaledPosition : scaledElevationPosition_Array,
                    Elevation: scaledElevation_Array
                }
            },

            getSpeedDistanceData_Mph: function(){
                return{
                    links: link_Array,
                    actualDriving : actualSpeedMph_Array,
                    actualPosition : actualSpeedPositionM_Array,
                    flatoutDriving : flatoutSpeedMph_Array,
                    flatoutPosition : flatoutSpeedPositionM_Array,
                    ecoDriving : optimalSpeedMph_Array,
                    optimalPosition : optimalSpeedPositionM_Array,
                    speedLimit :  speedRestrictionsValuesMph_Array,
                    endPoint : speedRestrictionsPointsM_Array,
                    scaledPosition : scaledElevationPositionM_Array,
                    Elevation: scaledElevation_Array
                }
            },


            getSpeedDistanceData: function (speedDistances) {
                var link_Array=[];
                var driverAdvice_Array = [];
                var actualSpeed_Array = [];
                var actualSpeedPosition_Array = [];
                var flatoutSpeed_Array = [];
                var flatoutSpeedPosition_Array = [];
                var optimalSpeed_Array = [];
                var optimalSpeedPosition_Array = [];
                var scaledElevation_Array = [];
                var scaledElevationPosition_Array = [];
                var speedRestrictions_Array =[];
                var speedDistanceData={};
                
                _.each(speedDistances, function (val, key1){
                    var speedDistanceReportPerJourney =speedDistances[key1].speedDistanceReportPerJourney;
                    _.each(speedDistanceReportPerJourney, function(val, key2){
                        actualSpeed = _.pluck(speedDistanceReportPerJourney[key2].speedDistanceProfiles.actualSpeedAndPositionList,'speed');
                        actualSpeed_Array.push(actualSpeed);

                        actualSpeedPosition = _.pluck(speedDistanceReportPerJourney[key2].speedDistanceProfiles.actualSpeedAndPositionList,'position');
                        actualSpeedPosition_Array.push(actualSpeedPosition);

                        flatoutSpeed = _.pluck(speedDistanceReportPerJourney[key2].speedDistanceProfiles.flatoutSpeedAndPositionList,'speed');
                        flatoutSpeed_Array.push(flatoutSpeed);

                        flatoutSpeedPosition = _.pluck(speedDistanceReportPerJourney[key2].speedDistanceProfiles.flatoutSpeedAndPositionList,'position');
                        flatoutSpeedPosition_Array.push(flatoutSpeedPosition);

                        optimalSpeed = _.pluck(speedDistanceReportPerJourney[key2].speedDistanceProfiles.optimalSpeedAndPositionList,'speed');
                        optimalSpeed_Array.push(optimalSpeed);

                        optimalSpeedPosition = _.pluck(speedDistanceReportPerJourney[key2].speedDistanceProfiles.optimalSpeedAndPositionList,'position');
                        optimalSpeedPosition_Array.push(optimalSpeedPosition);

                        scaledElevation = _.pluck(speedDistanceReportPerJourney[key2].scaledElevations,'scaledElevation');
                        scaledElevation_Array.push(scaledElevation);

                        scaledElevationPosition = _.pluck(speedDistanceReportPerJourney[key2].scaledElevations,'position');
                        scaledElevationPosition_Array.push(scaledElevationPosition);

                        speedRestrictions = _.pluck(speedDistanceReportPerJourney[key2].speedRestrictions);
                        speedRestrictions_Array.push(speedRestrictions);
                    });  
                });

                speedDistanceData = {
                    'link': link_Array,
                    'driverAdvice': driverAdvice_Array,
                    'actualSpeed': actualSpeed_Array,
                    'actualSpeedPosition' : actualSpeedPosition_Array,
                    'flatoutSpeed' : flatoutSpeed_Array,
                    'flatoutSpeedPosition' : flatoutSpeedPosition_Array,
                    'optimalSpeed' : optimalSpeed_Array,
                    'optimalSpeedPosition' : optimalSpeedPosition_Array,
                    'speedRestriction' : speedRestrictions_Array
                }
                return speedDistanceData;
            }
        }
         
    }


})();