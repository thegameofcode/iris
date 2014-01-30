(function($) {


	function addFilter(p_component, p_function_name, p_filter) {

		var component_params,
				chain = {},
				that,
				fn_original = p_component[p_function_name];

		chain.doFilter = function() {
			if (component_params) {
				return fn_original.apply(that, component_params);
			} else {
				return fn_original.call(that);
			}
		};
		
		p_component[p_function_name] = function() {
			that = this;
			component_params = arguments;
			return p_filter.fn(chain, component_params, p_filter.params);
		};
	}

	iris.addFilter = function(p_component, p_function_name, p_filter) {

		if (!p_component && typeof p_component !== 'object') {
			throw 'The component has to be an object';
		}

		if ($.isArray(p_function_name)) {
			$.each(p_function_name, function(index, value) {
				if ($.isArray(p_filter)) {
					iris.addFilter(p_component, value, p_filter[index]);
				} else {
					iris.addFilter(p_component, value, p_filter);
				}
			});
		} else if (typeof p_function_name !== 'string' || typeof p_component[p_function_name] !== 'function') {
			throw 'The function name has to be the name of a function';
		}

		if (typeof p_filter === 'function') {
			p_filter = {
				fn: p_filter
			};
		}


		addFilter(p_component, p_function_name, p_filter);
	};

})(jQuery);
