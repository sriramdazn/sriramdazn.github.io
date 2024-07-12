!function(){var e={153:function(e,t,r){"use strict";r.r(t),r.d(t,{Emitter:function(){return y},EvaluationReason:function(){return _},FeaturevisorInstance:function(){return x},Logger:function(){return l},MAX_BUCKETED_NUMBER:function(){return o},allConditionsAreMatched:function(){return E},conditionIsMatched:function(){return w},createInstance:function(){return F},createLogger:function(){return h},defaultLogHandler:function(){return c},defaultLogLevels:function(){return f},getBucketedNumber:function(){return s},getValueByType:function(){return I},loggerPrefix:function(){return u}});var i=r(5),n=1,a=Math.pow(2,32),o=1e5;function s(e){var t=i.v3(e,n)/a;return Math.floor(t*o)}var u="[Featurevisor]",f=["warn","error"],c=function(e,t,r){switch(void 0===r&&(r={}),e){case"debug":console.log(u,t,r);break;case"info":console.info(u,t,r);break;case"warn":console.warn(u,t,r);break;case"error":console.error(u,t,r)}},l=function(){function e(e){this.levels=e.levels,this.handle=e.handler}return e.prototype.setLevels=function(e){this.levels=e},e.prototype.log=function(e,t,r){-1!==this.levels.indexOf(e)&&this.handle(e,t,r)},e.prototype.debug=function(e,t){this.log("debug",e,t)},e.prototype.info=function(e,t){this.log("info",e,t)},e.prototype.warn=function(e,t){this.log("warn",e,t)},e.prototype.error=function(e,t){this.log("error",e,t)},e}();function h(e){void 0===e&&(e={});var t=e.levels||f,r=e.handler||c;return new l({levels:t,handler:r})}var d=function(){function e(e){this.schemaVersion=e.schemaVersion,this.revision=e.revision,this.segments=e.segments,this.attributes=e.attributes,this.features=e.features}return e.prototype.getRevision=function(){return this.revision},e.prototype.getSchemaVersion=function(){return this.schemaVersion},e.prototype.getAllAttributes=function(){return this.attributes},e.prototype.getAttribute=function(e){return this.attributes.find((function(t){return t.key===e}))},e.prototype.getSegment=function(e){var t=this.segments.find((function(t){return t.key===e}));if(t)return function(e,t){if("string"==typeof e[t]&&"*"!==e[t])try{e[t]=JSON.parse(e[t])}catch(e){console.error("Error parsing JSON",e)}return e}(t,"conditions")},e.prototype.getFeature=function(e){var t=this.features.find((function(t){return t.key===e}));if(t)return t},e}(),y=function(){function e(){this._listeners={}}return e.prototype.addListener=function(e,t){void 0===this._listeners[e]&&(this._listeners[e]=[]),this._listeners[e].push(t)},e.prototype.removeListener=function(e,t){if(void 0!==this._listeners[e]){var r=this._listeners[e].indexOf(t);-1!==r&&this._listeners[e].splice(r,1)}},e.prototype.removeAllListeners=function(e){var t=this;e?this._listeners[e]=[]:Object.keys(this._listeners).forEach((function(e){t._listeners[e]=[]}))},e.prototype.emit=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];void 0!==this._listeners[e]&&this._listeners[e].forEach((function(e){e.apply(void 0,t)}))},e}();const v=/^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i,g=e=>{if("string"!=typeof e)throw new TypeError("Invalid argument expected string");const t=e.match(v);if(!t)throw new Error(`Invalid argument not valid semver ('${e}' received)`);return t.shift(),t},b=e=>"*"===e||"x"===e||"X"===e,p=e=>{const t=parseInt(e,10);return isNaN(t)?e:t},m=(e,t)=>{if(b(e)||b(t))return 0;const[r,i]=((e,t)=>typeof e!=typeof t?[String(e),String(t)]:[e,t])(p(e),p(t));return r>i?1:r<i?-1:0},k=(e,t)=>{for(let r=0;r<Math.max(e.length,t.length);r++){const i=m(e[r]||"0",t[r]||"0");if(0!==i)return i}return 0},A=(e,t)=>{const r=g(e),i=g(t),n=r.pop(),a=i.pop(),o=k(r,i);return 0!==o?o:n&&a?k(n.split("."),a.split(".")):n||a?n?-1:1:0};function w(e,t){var r=e.attribute,i=e.operator,n=e.value;if("equals"===i)return t[r]===n;if("notEquals"===i)return t[r]!==n;if("before"===i||"after"===i){var a=(s=t[r])instanceof Date?s:new Date(s),o=n instanceof Date?n:new Date(n);return"before"===i?a<o:a>o}if("string"==typeof t[r]&&Array.isArray(n)){var s=t[r];if("in"===i)return-1!==n.indexOf(s);if("notIn"===i)return-1===n.indexOf(s)}else if("string"==typeof t[r]&&"string"==typeof n){if(s=t[r],"contains"===i)return-1!==s.indexOf(n);if("notContains"===i)return-1===s.indexOf(n);if("startsWith"===i)return s.startsWith(n);if("endsWith"===i)return s.endsWith(n);if("semverEquals"===i)return 0===A(s,n);if("semverNotEquals"===i)return 0!==A(s,n);if("semverGreaterThan"===i)return 1===A(s,n);if("semverGreaterThanOrEquals"===i)return A(s,n)>=0;if("semverLessThan"===i)return-1===A(s,n);if("semverLessThanOrEquals"===i)return A(s,n)<=0}else if("number"==typeof t[r]&&"number"==typeof n){if(s=t[r],"greaterThan"===i)return s>n;if("greaterThanOrEquals"===i)return s>=n;if("lessThan"===i)return s<n;if("lessThanOrEquals"===i)return s<=n}return!1}function E(e,t,r){if("attribute"in e)try{return w(e,t)}catch(i){return r.warn(i.message,{error:i,details:{condition:e,context:t}}),!1}return"and"in e&&Array.isArray(e.and)?e.and.every((function(e){return E(e,t,r)})):"or"in e&&Array.isArray(e.or)?e.or.some((function(e){return E(e,t,r)})):"not"in e&&Array.isArray(e.not)?e.not.every((function(){return!1===E({and:e.not},t,r)})):!!Array.isArray(e)&&e.every((function(e){return E(e,t,r)}))}function T(e,t,r,i){if("*"===e)return!0;if("string"==typeof e){var n=r.getSegment(e);return!!n&&function(e,t,r){return E(e.conditions,t,r)}(n,t,i)}if("object"==typeof e){if("and"in e&&Array.isArray(e.and))return e.and.every((function(e){return T(e,t,r,i)}));if("or"in e&&Array.isArray(e.or))return e.or.some((function(e){return T(e,t,r,i)}));if("not"in e&&Array.isArray(e.not))return e.not.every((function(e){return!1===T(e,t,r,i)}))}return!!Array.isArray(e)&&e.every((function(e){return T(e,t,r,i)}))}function O(e){return"string"==typeof e&&(e.startsWith("{")||e.startsWith("["))?JSON.parse(e):e}function K(e,t,r,i,n){var a=e.find((function(e){return T(O(e.segments),t,i,n)}));if(!a)return{matchedTraffic:void 0,matchedAllocation:void 0};var o=function(e,t){for(var r=0,i=e.allocation;r<i.length;r++){var n=i[r],a=n.range,o=a[0],s=a[1];if(n.range&&o<=t&&s>=t)return n}}(a,r);return{matchedTraffic:a,matchedAllocation:o}}function R(e,t,r,i){var n={force:void 0,forceIndex:void 0};if(!e.force)return n;for(var a=0;a<e.force.length;a++){var o=e.force[a];if(o.conditions&&E(o.conditions,t,i)){n.force=o,n.forceIndex=a;break}if(o.segments&&T(o.segments,t,r,i)){n.force=o,n.forceIndex=a;break}}return n}var _,B={schemaVersion:"1",revision:"unknown",attributes:[],segments:[],features:[]};function V(e,t){return t?t(e):fetch(e).then((function(e){return e.json()}))}function I(e,t){try{if(void 0===e)return;switch(t){case"string":return"string"==typeof e?e:void 0;case"integer":return parseInt(e,10);case"double":return parseFloat(e);case"boolean":return!0===e;case"array":return Array.isArray(e)?e:void 0;case"object":return"object"==typeof e?e:void 0;default:return e}}catch(e){return}}!function(e){e.NOT_FOUND="not_found",e.NO_VARIATIONS="no_variations",e.NO_MATCH="no_match",e.DISABLED="disabled",e.REQUIRED="required",e.OUT_OF_RANGE="out_of_range",e.FORCED="forced",e.INITIAL="initial",e.STICKY="sticky",e.RULE="rule",e.ALLOCATED="allocated",e.DEFAULTED="defaulted",e.OVERRIDE="override",e.ERROR="error"}(_||(_={}));var x=function(){function e(e){var t=this;this.bucketKeySeparator=e.bucketKeySeparator||".",this.configureBucketKey=e.configureBucketKey,this.configureBucketValue=e.configureBucketValue,this.datafileUrl=e.datafileUrl,this.handleDatafileFetch=e.handleDatafileFetch,this.initialFeatures=e.initialFeatures,this.interceptContext=e.interceptContext,this.logger=e.logger||h(),this.refreshInterval=e.refreshInterval,this.stickyFeatures=e.stickyFeatures,this.emitter=new y,this.statuses={ready:!1,refreshInProgress:!1},e.onReady&&this.emitter.addListener("ready",e.onReady),e.onRefresh&&this.emitter.addListener("refresh",e.onRefresh),e.onUpdate&&this.emitter.addListener("update",e.onUpdate),e.onActivation&&this.emitter.addListener("activation",e.onActivation);var r=this.emitter.addListener.bind(this.emitter);this.on=r,this.addListener=r;var i=this.emitter.removeListener.bind(this.emitter);if(this.off=i,this.removeListener=i,this.removeAllListeners=this.emitter.removeAllListeners.bind(this.emitter),e.datafileUrl)this.setDatafile(e.datafile||B),V(e.datafileUrl,e.handleDatafileFetch).then((function(e){t.setDatafile(e),t.statuses.ready=!0,t.emitter.emit("ready"),t.refreshInterval&&t.startRefreshing()})).catch((function(e){t.logger.error("failed to fetch datafile",{error:e})}));else{if(!e.datafile)throw new Error("Featurevisor SDK instance cannot be created without both `datafile` and `datafileUrl` options");this.setDatafile(e.datafile),this.statuses.ready=!0,setTimeout((function(){t.emitter.emit("ready")}),0)}}return e.prototype.setLogLevels=function(e){this.logger.setLevels(e)},e.prototype.onReady=function(){var e=this;return new Promise((function(t){if(e.statuses.ready)return t(e);var r=function(){e.emitter.removeListener("ready",r),t(e)};e.emitter.addListener("ready",r)}))},e.prototype.setDatafile=function(e){try{this.datafileReader=new d("string"==typeof e?JSON.parse(e):e)}catch(e){this.logger.error("could not parse datafile",{error:e})}},e.prototype.setStickyFeatures=function(e){this.stickyFeatures=e},e.prototype.getRevision=function(){return this.datafileReader.getRevision()},e.prototype.getFeature=function(e){return"string"==typeof e?this.datafileReader.getFeature(e):e},e.prototype.getBucketKey=function(e,t){var r,i,n=e.key;if("string"==typeof e.bucketBy)r="plain",i=[e.bucketBy];else if(Array.isArray(e.bucketBy))r="and",i=e.bucketBy;else{if("object"!=typeof e.bucketBy||!Array.isArray(e.bucketBy.or))throw this.logger.error("invalid bucketBy",{featureKey:n,bucketBy:e.bucketBy}),new Error("invalid bucketBy");r="or",i=e.bucketBy.or}var a=[];i.forEach((function(e){var i=t[e];void 0!==i&&("plain"===r||"and"===r||0===a.length)&&a.push(i)})),a.push(n);var o=a.join(this.bucketKeySeparator);return this.configureBucketKey?this.configureBucketKey(e,t,o):o},e.prototype.getBucketValue=function(e,t){var r=this.getBucketKey(e,t),i=s(r);return this.configureBucketValue?{bucketKey:r,bucketValue:this.configureBucketValue(e,t,i)}:{bucketKey:r,bucketValue:i}},e.prototype.isReady=function(){return this.statuses.ready},e.prototype.refresh=function(){var e=this;return this.logger.debug("refreshing datafile"),this.statuses.refreshInProgress?this.logger.warn("refresh in progress, skipping"):this.datafileUrl?(this.statuses.refreshInProgress=!0,void V(this.datafileUrl,this.handleDatafileFetch).then((function(t){var r=e.getRevision()!==t.revision;e.setDatafile(t),e.logger.info("refreshed datafile"),e.emitter.emit("refresh"),r&&e.emitter.emit("update"),e.statuses.refreshInProgress=!1})).catch((function(t){e.logger.error("failed to refresh datafile",{error:t}),e.statuses.refreshInProgress=!1}))):this.logger.error("cannot refresh since `datafileUrl` is not provided")},e.prototype.startRefreshing=function(){var e=this;return this.datafileUrl?this.intervalId?this.logger.warn("refreshing has already started"):this.refreshInterval?void(this.intervalId=setInterval((function(){e.refresh()}),1e3*this.refreshInterval)):this.logger.warn("no `refreshInterval` option provided"):this.logger.error("cannot start refreshing since `datafileUrl` is not provided")},e.prototype.stopRefreshing=function(){if(!this.intervalId)return this.logger.warn("refreshing has not started yet");clearInterval(this.intervalId)},e.prototype.evaluateFlag=function(e,t){var r,i=this;void 0===t&&(t={});try{var n="string"==typeof e?e:e.key;if(this.stickyFeatures&&this.stickyFeatures[n]&&void 0!==this.stickyFeatures[n].enabled)return r={featureKey:n,reason:_.STICKY,sticky:this.stickyFeatures[n],enabled:this.stickyFeatures[n].enabled},this.logger.debug("using sticky enabled",r),r;if(this.statuses&&!this.statuses.ready&&this.initialFeatures&&this.initialFeatures[n]&&void 0!==this.initialFeatures[n].enabled)return r={featureKey:n,reason:_.INITIAL,initial:this.initialFeatures[n],enabled:this.initialFeatures[n].enabled},this.logger.debug("using initial enabled",r),r;var a=this.getFeature(e);if(!a)return r={featureKey:n,reason:_.NOT_FOUND},this.logger.warn("feature not found",r),r;a.deprecated&&this.logger.warn("feature is deprecated",{featureKey:a.key});var o=this.interceptContext?this.interceptContext(t):t,s=R(a,t,this.datafileReader,this.logger),u=s.force,f=s.forceIndex;if(u&&void 0!==u.enabled)return r={featureKey:a.key,reason:_.FORCED,forceIndex:f,force:u,enabled:u.enabled},this.logger.debug("forced enabled found",r),r;if(a.required&&a.required.length>0){var c=a.required.every((function(e){var t,r;return"string"==typeof e?t=e:(t=e.key,r=e.variation),!!i.isEnabled(t,o)&&(void 0===r||i.getVariation(t,o)===r)}));if(!c)return r={featureKey:a.key,reason:_.REQUIRED,required:a.required,enabled:c},this.logger.debug("required features not enabled",r),r}var l=this.getBucketValue(a,o),h=l.bucketKey,d=l.bucketValue,y=function(e,t,r,i){return e.find((function(e){return!!T(O(e.segments),t,r,i)}))}(a.traffic,o,this.datafileReader,this.logger);if(y){if(a.ranges&&a.ranges.length>0)return a.ranges.find((function(e){return d>=e[0]&&d<e[1]}))?(r={featureKey:a.key,reason:_.ALLOCATED,bucketKey:h,bucketValue:d,ruleKey:y.key,traffic:y,enabled:void 0===y.enabled||y.enabled},this.logger.debug("matched",r),r):(r={featureKey:a.key,reason:_.OUT_OF_RANGE,bucketKey:h,bucketValue:d,enabled:!1},this.logger.debug("not matched",r),r);if(void 0!==y.enabled)return r={featureKey:a.key,reason:_.OVERRIDE,bucketKey:h,bucketValue:d,ruleKey:y.key,traffic:y,enabled:y.enabled},this.logger.debug("override from rule",r),r;if(d<=y.percentage)return r={featureKey:a.key,reason:_.RULE,bucketKey:h,bucketValue:d,ruleKey:y.key,traffic:y,enabled:!0},this.logger.debug("matched traffic",r),r}return r={featureKey:a.key,reason:_.NO_MATCH,bucketKey:h,bucketValue:d,enabled:!1},this.logger.debug("nothing matched",r),r}catch(t){return r={featureKey:"string"==typeof e?e:e.key,reason:_.ERROR,error:t},this.logger.error("error",r),r}},e.prototype.isEnabled=function(e,t){void 0===t&&(t={});try{return!0===this.evaluateFlag(e,t).enabled}catch(t){return this.logger.error("isEnabled",{featureKey:e,error:t}),!1}},e.prototype.evaluateVariation=function(e,t){var r;void 0===t&&(t={});try{var i="string"==typeof e?e:e.key;if(!1===this.evaluateFlag(e,t).enabled)return r={featureKey:i,reason:_.DISABLED},this.logger.debug("feature is disabled",r),r;if(this.stickyFeatures&&this.stickyFeatures[i]&&void 0!==(n=this.stickyFeatures[i].variation))return r={featureKey:i,reason:_.STICKY,variationValue:n},this.logger.debug("using sticky variation",r),r;if(this.statuses&&!this.statuses.ready&&this.initialFeatures&&this.initialFeatures[i]&&void 0!==this.initialFeatures[i].variation){var n=this.initialFeatures[i].variation;return r={featureKey:i,reason:_.INITIAL,variationValue:n},this.logger.debug("using initial variation",r),r}var a=this.getFeature(e);if(!a)return r={featureKey:i,reason:_.NOT_FOUND},this.logger.warn("feature not found",r),r;if(!a.variations||0===a.variations.length)return r={featureKey:i,reason:_.NO_VARIATIONS},this.logger.warn("no variations",r),r;var o=this.interceptContext?this.interceptContext(t):t,s=R(a,t,this.datafileReader,this.logger),u=s.force,f=s.forceIndex;if(u&&u.variation&&(g=a.variations.find((function(e){return e.value===u.variation}))))return r={featureKey:a.key,reason:_.FORCED,forceIndex:f,force:u,variation:g},this.logger.debug("forced variation found",r),r;var c=this.getBucketValue(a,o),l=c.bucketKey,h=c.bucketValue,d=K(a.traffic,o,h,this.datafileReader,this.logger),y=d.matchedTraffic,v=d.matchedAllocation;if(y){var g;if(y.variation&&(g=a.variations.find((function(e){return e.value===y.variation}))))return r={featureKey:a.key,reason:_.RULE,bucketKey:l,bucketValue:h,ruleKey:y.key,traffic:y,variation:g},this.logger.debug("override from rule",r),r;if(v&&v.variation&&(g=a.variations.find((function(e){return e.value===v.variation}))))return r={featureKey:a.key,reason:_.ALLOCATED,bucketKey:l,bucketValue:h,ruleKey:y.key,traffic:y,variation:g},this.logger.debug("allocated variation",r),r}return r={featureKey:a.key,reason:_.NO_MATCH,bucketKey:l,bucketValue:h},this.logger.debug("no matched variation",r),r}catch(t){return r={featureKey:"string"==typeof e?e:e.key,reason:_.ERROR,error:t},this.logger.error("error",r),r}},e.prototype.getVariation=function(e,t){void 0===t&&(t={});try{var r=this.evaluateVariation(e,t);return void 0!==r.variationValue?r.variationValue:r.variation?r.variation.value:void 0}catch(t){return void this.logger.error("getVariation",{featureKey:e,error:t})}},e.prototype.activate=function(e,t){void 0===t&&(t={});try{var r=this.evaluateVariation(e,t),i=r.variation?r.variation.value:r.variationValue;if(void 0===i)return;var n=this.interceptContext?this.interceptContext(t):t,a={};return this.datafileReader.getAllAttributes().filter((function(e){return!0===e.capture})).forEach((function(e){void 0!==n[e.key]&&(a[e.key]=t[e.key])})),this.emitter.emit("activation",e,i,n,a,r),i}catch(t){return void this.logger.error("activate",{featureKey:e,error:t})}},e.prototype.evaluateVariable=function(e,t,r){var i,n=this;void 0===r&&(r={});try{var a,o="string"==typeof e?e:e.key;if(!1===this.evaluateFlag(e,r).enabled)return i={featureKey:o,reason:_.DISABLED},this.logger.debug("feature is disabled",i),i;if(this.stickyFeatures&&this.stickyFeatures[o]&&(a=this.stickyFeatures[o].variables)){var s=a[t];if(void 0!==s)return i={featureKey:o,reason:_.STICKY,variableKey:t,variableValue:s},this.logger.debug("using sticky variable",i),i}if(this.statuses&&!this.statuses.ready&&this.initialFeatures&&this.initialFeatures[o]&&(a=this.initialFeatures[o].variables)&&void 0!==a[t])return i={featureKey:o,reason:_.INITIAL,variableKey:t,variableValue:a[t]},this.logger.debug("using initial variable",i),i;var u=this.getFeature(e);if(!u)return i={featureKey:o,reason:_.NOT_FOUND,variableKey:t},this.logger.warn("feature not found in datafile",i),i;var f=Array.isArray(u.variablesSchema)?u.variablesSchema.find((function(e){return e.key===t})):void 0;if(!f)return i={featureKey:o,reason:_.NOT_FOUND,variableKey:t},this.logger.warn("variable schema not found",i),i;var c=this.interceptContext?this.interceptContext(r):r,l=R(u,r,this.datafileReader,this.logger),h=l.force,d=l.forceIndex;if(h&&h.variables&&void 0!==h.variables[t])return i={featureKey:u.key,reason:_.FORCED,forceIndex:d,force:h,variableKey:t,variableSchema:f,variableValue:h.variables[t]},this.logger.debug("forced variable",i),i;var y=this.getBucketValue(u,c),v=y.bucketKey,g=y.bucketValue,b=K(u.traffic,c,g,this.datafileReader,this.logger),p=b.matchedTraffic,m=b.matchedAllocation;if(p){if(p.variables&&void 0!==p.variables[t])return i={featureKey:u.key,reason:_.RULE,bucketKey:v,bucketValue:g,ruleKey:p.key,traffic:p,variableKey:t,variableSchema:f,variableValue:p.variables[t]},this.logger.debug("override from rule",i),i;var k;if(h&&h.variation?k=h.variation:m&&m.variation&&(k=m.variation),k&&Array.isArray(u.variations)){var A=u.variations.find((function(e){return e.value===k}));if(A&&A.variables){var w=A.variables.find((function(e){return e.key===t}));if(w){if(w.overrides){var B=w.overrides.find((function(e){return e.conditions?E("string"==typeof e.conditions?JSON.parse(e.conditions):e.conditions,c,n.logger):!!e.segments&&T(O(e.segments),c,n.datafileReader,n.logger)}));if(B)return i={featureKey:u.key,reason:_.OVERRIDE,bucketKey:v,bucketValue:g,ruleKey:p.key,traffic:p,variableKey:t,variableSchema:f,variableValue:B.value},this.logger.debug("variable override",i),i}if(void 0!==w.value)return i={featureKey:u.key,reason:_.ALLOCATED,bucketKey:v,bucketValue:g,ruleKey:p.key,traffic:p,variableKey:t,variableSchema:f,variableValue:w.value},this.logger.debug("allocated variable",i),i}}}}return i={featureKey:u.key,reason:_.DEFAULTED,bucketKey:v,bucketValue:g,variableKey:t,variableSchema:f,variableValue:f.defaultValue},this.logger.debug("using default value",i),i}catch(r){return i={featureKey:"string"==typeof e?e:e.key,reason:_.ERROR,variableKey:t,error:r},this.logger.error("error",i),i}},e.prototype.getVariable=function(e,t,r){void 0===r&&(r={});try{var i=this.evaluateVariable(e,t,r);return void 0!==i.variableValue?i.variableSchema&&"json"===i.variableSchema.type&&"string"==typeof i.variableValue?JSON.parse(i.variableValue):i.variableValue:void 0}catch(r){return void this.logger.error("getVariable",{featureKey:e,variableKey:t,error:r})}},e.prototype.getVariableBoolean=function(e,t,r){return void 0===r&&(r={}),I(this.getVariable(e,t,r),"boolean")},e.prototype.getVariableString=function(e,t,r){return void 0===r&&(r={}),I(this.getVariable(e,t,r),"string")},e.prototype.getVariableInteger=function(e,t,r){return void 0===r&&(r={}),I(this.getVariable(e,t,r),"integer")},e.prototype.getVariableDouble=function(e,t,r){return void 0===r&&(r={}),I(this.getVariable(e,t,r),"double")},e.prototype.getVariableArray=function(e,t,r){return void 0===r&&(r={}),I(this.getVariable(e,t,r),"array")},e.prototype.getVariableObject=function(e,t,r){return void 0===r&&(r={}),I(this.getVariable(e,t,r),"object")},e.prototype.getVariableJSON=function(e,t,r){return void 0===r&&(r={}),I(this.getVariable(e,t,r),"json")},e}();function F(e){return new x(e)}},767:function(e,t,r){"use strict";!function(e){function t(){}function r(){}var i=String.fromCharCode,n={}.toString,a=n.call(e.SharedArrayBuffer),o=n(),s=e.Uint8Array,u=s||Array,f=s?ArrayBuffer:u,c=f.isView||function(e){return e&&"length"in e},l=n.call(f.prototype);f=r.prototype;var h=e.TextEncoder,d=new(s?Uint16Array:u)(32);t.prototype.decode=function(e){if(!c(e)){var t=n.call(e);if(t!==l&&t!==a&&t!==o)throw TypeError("Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");e=s?new u(e):e||[]}for(var r,f,h,y=t="",v=0,g=0|e.length,b=g-32|0,p=0,m=0,k=0,A=-1;v<g;){for(r=v<=b?32:g-v|0;k<r;v=v+1|0,k=k+1|0){switch((f=255&e[v])>>4){case 15:if(2!=(h=255&e[v=v+1|0])>>6||247<f){v=v-1|0;break}p=(7&f)<<6|63&h,m=5,f=256;case 14:p<<=6,p|=(15&f)<<6|63&(h=255&e[v=v+1|0]),m=2==h>>6?m+4|0:24,f=f+256&768;case 13:case 12:p<<=6,p|=(31&f)<<6|63&(h=255&e[v=v+1|0]),m=m+7|0,v<g&&2==h>>6&&p>>m&&1114112>p?(f=p,0<=(p=p-65536|0)&&(A=55296+(p>>10)|0,f=56320+(1023&p)|0,31>k?(d[k]=A,k=k+1|0,A=-1):(h=A,A=f,f=h))):(v=v-(f>>=8)-1|0,f=65533),p=m=0,r=v<=b?32:g-v|0;default:d[k]=f;continue;case 11:case 10:case 9:case 8:}d[k]=65533}if(y+=i(d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10],d[11],d[12],d[13],d[14],d[15],d[16],d[17],d[18],d[19],d[20],d[21],d[22],d[23],d[24],d[25],d[26],d[27],d[28],d[29],d[30],d[31]),32>k&&(y=y.slice(0,k-32|0)),v<g){if(d[0]=A,k=~A>>>31,A=-1,y.length<t.length)continue}else-1!==A&&(y+=i(A));t+=y,y=""}return t},f.encode=function(e){var t,r=0|(e=void 0===e?"":""+e).length,i=new u(8+(r<<1)|0),n=0,a=!s;for(t=0;t<r;t=t+1|0,n=n+1|0){var o=0|e.charCodeAt(t);if(127>=o)i[n]=o;else{if(2047>=o)i[n]=192|o>>6;else{e:{if(55296<=o)if(56319>=o){var f=0|e.charCodeAt(t=t+1|0);if(56320<=f&&57343>=f){if(65535<(o=(o<<10)+f-56613888|0)){i[n]=240|o>>18,i[n=n+1|0]=128|o>>12&63,i[n=n+1|0]=128|o>>6&63,i[n=n+1|0]=128|63&o;continue}break e}o=65533}else 57343>=o&&(o=65533);!a&&t<<1<n&&t<<1<(n-7|0)&&(a=!0,(f=new u(3*r)).set(i),i=f)}i[n]=224|o>>12,i[n=n+1|0]=128|o>>6&63}i[n=n+1|0]=128|63&o}}return s?i.subarray(0,n):i.slice(0,n)},h||(e.TextDecoder=t,e.TextEncoder=r)}(""+void 0==typeof r.g?""+void 0==typeof self?this:self:r.g)},5:function(e){!function(){const t=e=>(new TextEncoder).encode(e);function r(e,r){let i,n,a,o,s,u,f,c;for("string"==typeof e&&(e=t(e)),i=3&e.length,n=e.length-i,a=r,s=3432918353,u=461845907,c=0;c<n;)f=255&e[c]|(255&e[++c])<<8|(255&e[++c])<<16|(255&e[++c])<<24,++c,f=(65535&f)*s+(((f>>>16)*s&65535)<<16)&4294967295,f=f<<15|f>>>17,f=(65535&f)*u+(((f>>>16)*u&65535)<<16)&4294967295,a^=f,a=a<<13|a>>>19,o=5*(65535&a)+((5*(a>>>16)&65535)<<16)&4294967295,a=27492+(65535&o)+((58964+(o>>>16)&65535)<<16);switch(f=0,i){case 3:f^=(255&e[c+2])<<16;case 2:f^=(255&e[c+1])<<8;case 1:f^=255&e[c],f=(65535&f)*s+(((f>>>16)*s&65535)<<16)&4294967295,f=f<<15|f>>>17,f=(65535&f)*u+(((f>>>16)*u&65535)<<16)&4294967295,a^=f}return a^=e.length,a^=a>>>16,a=2246822507*(65535&a)+((2246822507*(a>>>16)&65535)<<16)&4294967295,a^=a>>>13,a=3266489909*(65535&a)+((3266489909*(a>>>16)&65535)<<16)&4294967295,a^=a>>>16,a>>>0}const i=r;i.v2=function(e,r){"string"==typeof e&&(e=t(e));let i,n=e.length,a=r^n,o=0;for(;n>=4;)i=255&e[o]|(255&e[++o])<<8|(255&e[++o])<<16|(255&e[++o])<<24,i=1540483477*(65535&i)+((1540483477*(i>>>16)&65535)<<16),i^=i>>>24,i=1540483477*(65535&i)+((1540483477*(i>>>16)&65535)<<16),a=1540483477*(65535&a)+((1540483477*(a>>>16)&65535)<<16)^i,n-=4,++o;switch(n){case 3:a^=(255&e[o+2])<<16;case 2:a^=(255&e[o+1])<<8;case 1:a^=255&e[o],a=1540483477*(65535&a)+((1540483477*(a>>>16)&65535)<<16)}return a^=a>>>13,a=1540483477*(65535&a)+((1540483477*(a>>>16)&65535)<<16),a^=a>>>15,a>>>0},i.v3=r,e.exports=i}()},624:function(e,t,r){"use strict";r.r(t),r.d(t,{DOMException:function(){return A},Headers:function(){return c},Request:function(){return b},Response:function(){return m},fetch:function(){return w}});var i="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||void 0!==r.g&&r.g||{},n={searchParams:"URLSearchParams"in i,iterable:"Symbol"in i&&"iterator"in Symbol,blob:"FileReader"in i&&"Blob"in i&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in i,arrayBuffer:"ArrayBuffer"in i};if(n.arrayBuffer)var a=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],o=ArrayBuffer.isView||function(e){return e&&a.indexOf(Object.prototype.toString.call(e))>-1};function s(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e)||""===e)throw new TypeError('Invalid character in header field name: "'+e+'"');return e.toLowerCase()}function u(e){return"string"!=typeof e&&(e=String(e)),e}function f(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return n.iterable&&(t[Symbol.iterator]=function(){return t}),t}function c(e){this.map={},e instanceof c?e.forEach((function(e,t){this.append(t,e)}),this):Array.isArray(e)?e.forEach((function(e){if(2!=e.length)throw new TypeError("Headers constructor: expected name/value pair to be length 2, found"+e.length);this.append(e[0],e[1])}),this):e&&Object.getOwnPropertyNames(e).forEach((function(t){this.append(t,e[t])}),this)}function l(e){if(!e._noBody)return e.bodyUsed?Promise.reject(new TypeError("Already read")):void(e.bodyUsed=!0)}function h(e){return new Promise((function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}}))}function d(e){var t=new FileReader,r=h(t);return t.readAsArrayBuffer(e),r}function y(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function v(){return this.bodyUsed=!1,this._initBody=function(e){var t;this.bodyUsed=this.bodyUsed,this._bodyInit=e,e?"string"==typeof e?this._bodyText=e:n.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:n.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:n.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():n.arrayBuffer&&n.blob&&(t=e)&&DataView.prototype.isPrototypeOf(t)?(this._bodyArrayBuffer=y(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):n.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||o(e))?this._bodyArrayBuffer=y(e):this._bodyText=e=Object.prototype.toString.call(e):(this._noBody=!0,this._bodyText=""),this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):n.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},n.blob&&(this.blob=function(){var e=l(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))}),this.arrayBuffer=function(){if(this._bodyArrayBuffer)return l(this)||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer));if(n.blob)return this.blob().then(d);throw new Error("could not read as ArrayBuffer")},this.text=function(){var e,t,r,i,n,a=l(this);if(a)return a;if(this._bodyBlob)return e=this._bodyBlob,r=h(t=new FileReader),n=(i=/charset=([A-Za-z0-9_-]+)/.exec(e.type))?i[1]:"utf-8",t.readAsText(e,n),r;if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),r=new Array(t.length),i=0;i<t.length;i++)r[i]=String.fromCharCode(t[i]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},n.formData&&(this.formData=function(){return this.text().then(p)}),this.json=function(){return this.text().then(JSON.parse)},this}c.prototype.append=function(e,t){e=s(e),t=u(t);var r=this.map[e];this.map[e]=r?r+", "+t:t},c.prototype.delete=function(e){delete this.map[s(e)]},c.prototype.get=function(e){return e=s(e),this.has(e)?this.map[e]:null},c.prototype.has=function(e){return this.map.hasOwnProperty(s(e))},c.prototype.set=function(e,t){this.map[s(e)]=u(t)},c.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},c.prototype.keys=function(){var e=[];return this.forEach((function(t,r){e.push(r)})),f(e)},c.prototype.values=function(){var e=[];return this.forEach((function(t){e.push(t)})),f(e)},c.prototype.entries=function(){var e=[];return this.forEach((function(t,r){e.push([r,t])})),f(e)},n.iterable&&(c.prototype[Symbol.iterator]=c.prototype.entries);var g=["CONNECT","DELETE","GET","HEAD","OPTIONS","PATCH","POST","PUT","TRACE"];function b(e,t){if(!(this instanceof b))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');var r,n,a=(t=t||{}).body;if(e instanceof b){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new c(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,a||null==e._bodyInit||(a=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new c(t.headers)),this.method=(n=(r=t.method||this.method||"GET").toUpperCase(),g.indexOf(n)>-1?n:r),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal||function(){if("AbortController"in i)return(new AbortController).signal}(),this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&a)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(a),!("GET"!==this.method&&"HEAD"!==this.method||"no-store"!==t.cache&&"no-cache"!==t.cache)){var o=/([?&])_=[^&]*/;o.test(this.url)?this.url=this.url.replace(o,"$1_="+(new Date).getTime()):this.url+=(/\?/.test(this.url)?"&":"?")+"_="+(new Date).getTime()}}function p(e){var t=new FormData;return e.trim().split("&").forEach((function(e){if(e){var r=e.split("="),i=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(i),decodeURIComponent(n))}})),t}function m(e,t){if(!(this instanceof m))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');if(t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.status<200||this.status>599)throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");this.ok=this.status>=200&&this.status<300,this.statusText=void 0===t.statusText?"":""+t.statusText,this.headers=new c(t.headers),this.url=t.url||"",this._initBody(e)}b.prototype.clone=function(){return new b(this,{body:this._bodyInit})},v.call(b.prototype),v.call(m.prototype),m.prototype.clone=function(){return new m(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new c(this.headers),url:this.url})},m.error=function(){var e=new m(null,{status:200,statusText:""});return e.ok=!1,e.status=0,e.type="error",e};var k=[301,302,303,307,308];m.redirect=function(e,t){if(-1===k.indexOf(t))throw new RangeError("Invalid status code");return new m(null,{status:t,headers:{location:e}})};var A=i.DOMException;try{new A}catch(e){(A=function(e,t){this.message=e,this.name=t;var r=Error(e);this.stack=r.stack}).prototype=Object.create(Error.prototype),A.prototype.constructor=A}function w(e,t){return new Promise((function(r,a){var o=new b(e,t);if(o.signal&&o.signal.aborted)return a(new A("Aborted","AbortError"));var f=new XMLHttpRequest;function l(){f.abort()}if(f.onload=function(){var e,t,i={statusText:f.statusText,headers:(e=f.getAllResponseHeaders()||"",t=new c,e.replace(/\r?\n[\t ]+/g," ").split("\r").map((function(e){return 0===e.indexOf("\n")?e.substr(1,e.length):e})).forEach((function(e){var r=e.split(":"),i=r.shift().trim();if(i){var n=r.join(":").trim();try{t.append(i,n)}catch(e){console.warn("Response "+e.message)}}})),t)};0===o.url.indexOf("file://")&&(f.status<200||f.status>599)?i.status=200:i.status=f.status,i.url="responseURL"in f?f.responseURL:i.headers.get("X-Request-URL");var n="response"in f?f.response:f.responseText;setTimeout((function(){r(new m(n,i))}),0)},f.onerror=function(){setTimeout((function(){a(new TypeError("Network request failed"))}),0)},f.ontimeout=function(){setTimeout((function(){a(new TypeError("Network request timed out"))}),0)},f.onabort=function(){setTimeout((function(){a(new A("Aborted","AbortError"))}),0)},f.open(o.method,function(e){try{return""===e&&i.location.href?i.location.href:e}catch(t){return e}}(o.url),!0),"include"===o.credentials?f.withCredentials=!0:"omit"===o.credentials&&(f.withCredentials=!1),"responseType"in f&&(n.blob?f.responseType="blob":n.arrayBuffer&&(f.responseType="arraybuffer")),t&&"object"==typeof t.headers&&!(t.headers instanceof c||i.Headers&&t.headers instanceof i.Headers)){var h=[];Object.getOwnPropertyNames(t.headers).forEach((function(e){h.push(s(e)),f.setRequestHeader(e,u(t.headers[e]))})),o.headers.forEach((function(e,t){-1===h.indexOf(t)&&f.setRequestHeader(t,e)}))}else o.headers.forEach((function(e,t){f.setRequestHeader(t,e)}));o.signal&&(o.signal.addEventListener("abort",l),f.onreadystatechange=function(){4===f.readyState&&o.signal.removeEventListener("abort",l)}),f.send(void 0===o._bodyInit?null:o._bodyInit)}))}w.polyfill=!0,i.fetch||(i.fetch=w,i.Headers=c,i.Request=b,i.Response=m)}},t={};function r(i){var n=t[i];if(void 0!==n)return n.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,r),a.exports}r.d=function(e,t){for(var i in t)r.o(t,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(767),r(624);try{r(153),document.body.innerHTML="test 2"}catch(e){document.body.innerHTML="test 3"+e.toString()}}();