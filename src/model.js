(function ($) {

    //
    // ModelFactory
    //
    var ModelFactory = function () {
        this.defaults = {};
        this.functions = {};
    };

    var modelFactoryProto = ModelFactory.prototype;

    modelFactoryProto.create = function (p_data) {
        var data = $.extend({}, this.defaults, p_data);
        var instance = new iris.Model(data);
        $.extend(instance, this.functions);
        instance.idField = this.idField;
        instance.url = this.url;
        return instance;
    };


    //
    // Model
    //
    var Model = function (p_data) {
        iris.Event.call(this);
        this.data = $.extend({}, p_data);
    };

    iris.inherits(Model, iris.Event);

    var modelProto = Model.prototype;

    // Data
    modelProto.set = function (p_data) {
        // TODO notify change event by field
        $.extend(this.data, p_data);
        this.notify('change');
    };

    modelProto.get = function (p_fieldName) {
        if ( p_fieldName === undefined ) {
            return this.data;
        }
        return this.data[p_fieldName];
    };

    // Persistence
    modelProto.save = function () {
        var url, method, id = this.data[this.idField];

        if ( id ) {
            method = 'PUT';
            url = this.url + '/' + id;
        } else {
            method = 'POST';
            url = this.url;
        }

        return iris.ajax({
            url: url,
            type: method,
            data: this.data,
            dataType: 'json'
        });
    };
    
    modelProto.load = function () {
        var id = this.data[this.idField];
        return iris.ajax({
            url: this.url + '/' + id,
            type: 'GET',
            dataType: 'json'
        });
    };

    modelProto.remove = function () {
        var id = this.data[this.idField];
        return iris.ajax({
            url: this.url + '/' + id,
            type: 'DELETE',
            dataType: 'json'
        });
    };

    // Conversion
    modelProto.toJson = function () {
        return JSON.stringify(this.data);
    };


    var Collection = function (modelPath, opts) {
        iris.Event.call(this);

        this.model = iris.model(modelPath);
        this.models = [];
        this.storage = opts.storage || 'rest';
        this.url = opts.url || '';
        this.name = opts.name || modelPath;
    };

    iris.inherits(Collection, iris.Event);

    var collectionProto = Collection.prototype;
    
    collectionProto.add = function (data) {
        var newModel = this.model.create(data);
        this.models.push(newModel);
        this.notify('add', newModel);
        return newModel;
    };

    collectionProto.remove = function (model) {
        var idx = $.inArray(model, this.models);
        if ( idx !== -1 ) {
            this.notify('remove');
            this.models.splice(idx, 1);
        }
        return this;
    };

    collectionProto.each = function (fn) {
        for (var i = 0; i < this.models.length; i++) {
            fn(this.models[i], i);
        }
    };

    collectionProto.where = function (attrs, fn) {
        var matches = [], valid;

        // Inverse to ensure iteration when fn deletes model
        for (var i = this.models.length - 1; i >= 0; i--) {
            valid = true;

            for ( var key in attrs ) {
                if ( this.models[i].get(key) !== attrs[key] ) {
                    valid = false;
                    break;
                }
            }

            if ( valid ) {
                if ( fn ) {
                    fn( this.models[i] );
                }

                matches.push( this.models[i] );
            }
        }

        return matches;
    };

    collectionProto.size = function () {
        return this.models.length;
    };

    collectionProto.toArray = function () {
        var array = [];
        for ( var i = 0; i < this.models.length; i++ ) {
            array.push(this.models[i].data);
        }
        return array;
    };

    collectionProto.toJson = function () {
        return JSON.stringify(this.toArray());
    };

    collectionProto.save = function () {
        switch ( this.storage ) {
            case 'localStorage':
                if ( localStorage ) localStorage.setItem( this.name, this.toJson() );
            break;
            default:
                console.log('invalid storage: ' + this.storage);
        }
    };

    collectionProto.load = function () {
        switch ( this.storage ) {
            case 'localStorage':
                if ( localStorage ) {
                    var models = localStorage.getItem(this.name);
                    if ( models ) {
                        models = JSON.parse(models);
                        for ( var i = 0; i < models.length; i++ ) {
                            this.add( models[i] );
                        }
                    }
                }
            break;
            default:
                console.log('invalid storage: ' + this.storage);
        }
        
    }

    //
    // Public
    //
    iris.Model = Model;
    iris.ModelFactory = ModelFactory;
    iris.Collection = Collection;

})(jQuery);
