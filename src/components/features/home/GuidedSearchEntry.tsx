import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type State = {
  code: string;
  name: string;
};

type City = {
  name: string;
  state_code: string;
};

type Procedure = {
  code: string;
  name: string;
  description: string;
};

type InsuranceProvider = {
  id: string;
  name: string;
};

export const GuidedSearchEntry = () => {
  const router = useRouter();
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [insuranceProviders, setInsuranceProviders] = useState<InsuranceProvider[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [filteredProcedures, setFilteredProcedures] = useState<Procedure[]>([]);
  
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [procedureSearch, setProcedureSearch] = useState<string>('');
  const [selectedProcedure, setSelectedProcedure] = useState<string>('');
  const [selectedInsurance, setSelectedInsurance] = useState<string>('');
  const [noInsurance, setNoInsurance] = useState<boolean>(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string>('');
  const [showProcedureDropdown, setShowProcedureDropdown] = useState<boolean>(false);

  // Mock data - in a real application, these would come from API calls
  useEffect(() => {
    // Sample states
    setStates([
      { code: 'CA', name: 'California' },
      { code: 'NY', name: 'New York' },
      { code: 'TX', name: 'Texas' },
      { code: 'FL', name: 'Florida' },
      { code: 'IL', name: 'Illinois' },
    ]);

    // Sample cities
    setCities([
      { name: 'Los Angeles', state_code: 'CA' },
      { name: 'San Francisco', state_code: 'CA' },
      { name: 'San Diego', state_code: 'CA' },
      { name: 'New York City', state_code: 'NY' },
      { name: 'Buffalo', state_code: 'NY' },
      { name: 'Houston', state_code: 'TX' },
      { name: 'Austin', state_code: 'TX' },
      { name: 'Dallas', state_code: 'TX' },
      { name: 'Miami', state_code: 'FL' },
      { name: 'Orlando', state_code: 'FL' },
      { name: 'Chicago', state_code: 'IL' },
    ]);

    // Sample procedures
    setProcedures([
      { code: '73721', name: 'MRI of knee', description: 'Magnetic resonance imaging of knee without contrast' },
      { code: '29881', name: 'Knee arthroscopy', description: 'Arthroscopy, knee, surgical; with meniscectomy' },
      { code: '43235', name: 'Upper endoscopy', description: 'Esophagogastroduodenoscopy, flexible, transoral' },
      { code: '45378', name: 'Colonoscopy', description: 'Colonoscopy, flexible; diagnostic' },
      { code: '99213', name: 'Office visit', description: 'Office or other outpatient visit, established patient' },
      { code: '36415', name: 'Blood draw', description: 'Collection of venous blood by venipuncture' },
      { code: '80053', name: 'Comprehensive metabolic panel', description: 'Blood test panel for electrolytes and metabolic function' },
      { code: '80061', name: 'Lipid panel', description: 'Blood test panel for cholesterol and lipids' },
    ]);

    // Sample insurance providers
    setInsuranceProviders([
      { id: 'bcbs', name: 'Blue Cross Blue Shield' },
      { id: 'aetna', name: 'Aetna' },
      { id: 'cigna', name: 'Cigna' },
      { id: 'uhc', name: 'UnitedHealthcare' },
      { id: 'kaiser', name: 'Kaiser Permanente' },
      { id: 'medicare', name: 'Medicare' },
      { id: 'medicaid', name: 'Medicaid' },
    ]);
  }, []);

  // Filter cities based on selected state
  useEffect(() => {
    if (selectedState) {
      setFilteredCities(cities.filter(city => city.state_code === selectedState));
    } else {
      setFilteredCities([]);
    }
  }, [selectedState, cities]);

  // Filter procedures based on search input
  useEffect(() => {
    if (procedureSearch.trim()) {
      const lowerCaseSearch = procedureSearch.toLowerCase();
      setFilteredProcedures(
        procedures.filter(
          procedure => 
            procedure.name.toLowerCase().includes(lowerCaseSearch) || 
            procedure.code.includes(lowerCaseSearch) ||
            procedure.description.toLowerCase().includes(lowerCaseSearch)
        )
      );
      setShowProcedureDropdown(true);
    } else {
      setFilteredProcedures([]);
      setShowProcedureDropdown(false);
    }
  }, [procedureSearch, procedures]);

  // Reset location selection state
  const resetLocationSelection = () => {
    setUseCurrentLocation(false);
    setIsLoadingLocation(false);
    setLocationError('');
  };

  // Handle current location toggle
  const handleLocationToggle = () => {
    if (!useCurrentLocation) {
      setIsLoadingLocation(true);
      setLocationError('');
      
      // Check if geolocation is available in the browser
      if (!navigator.geolocation) {
        setLocationError('Geolocation is not supported by your browser');
        setIsLoadingLocation(false);
        return;
      }
      
      // In a real app, we would use the Geolocation API
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Here we would call an API to get the city/state from coordinates
          // For now, just simulate finding a location
          setTimeout(() => {
            setSelectedState('CA');
            setSelectedCity('San Francisco');
            setIsLoadingLocation(false);
            setUseCurrentLocation(true);
          }, 1000);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
          setUseCurrentLocation(false);
          
          // Set appropriate error message based on the error code
          switch(error.code) {
            case error.PERMISSION_DENIED:
              setLocationError('Location access was denied. Please select your location manually.');
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationError('Location information is unavailable. Please select your location manually.');
              break;
            case error.TIMEOUT:
              setLocationError('The request to get your location timed out. Please select your location manually.');
              break;
            default:
              setLocationError('An unknown error occurred. Please select your location manually.');
              break;
          }
        },
        { timeout: 10000 } // 10 second timeout
      );
    } else {
      resetLocationSelection();
    }
  };

  // Handle procedure selection
  const handleProcedureSelect = (procedure: Procedure) => {
    setProcedureSearch(procedure.name);
    setSelectedProcedure(procedure.code);
    setShowProcedureDropdown(false);
  };

  // Handle insurance checkbox
  const handleNoInsuranceChange = () => {
    setNoInsurance(!noInsurance);
    if (!noInsurance) {
      setSelectedInsurance('');
    }
  };

  // Handle search submission
  const handleSearch = () => {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    
    if (selectedState) queryParams.append('state', selectedState);
    if (selectedCity) queryParams.append('city', selectedCity);
    if (selectedProcedure) queryParams.append('procedure', selectedProcedure);
    if (selectedInsurance) queryParams.append('insurance', selectedInsurance);
    if (noInsurance) queryParams.append('cashPrice', 'true');
    
    // Navigate to results page with query parameters
    router.push(`/results?${queryParams.toString()}`);
  };

  // Handle skip location
  const handleSkipLocation = () => {
    setSelectedState('');
    setSelectedCity('');
    resetLocationSelection();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Find Medical Costs Near You</h2>
      
      {/* Location Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-3">Where are you located?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              id="state"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity('');
              }}
              disabled={useCurrentLocation && isLoadingLocation}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState || (useCurrentLocation && isLoadingLocation)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            >
              <option value="">Select a city</option>
              {filteredCities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {locationError && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
            {locationError}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="use-location"
              type="checkbox"
              checked={useCurrentLocation}
              onChange={handleLocationToggle}
              disabled={isLoadingLocation}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="use-location" className="ml-2 block text-sm text-gray-700">
              {isLoadingLocation ? 'Getting your location...' : 'Use my current location'}
            </label>
          </div>
          
          <button
            type="button"
            onClick={handleSkipLocation}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Skip location
          </button>
        </div>
      </div>
      
      {/* Procedure Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-3">What procedure are you looking for?</h3>
        
        <div className="relative">
          <label htmlFor="procedure" className="block text-sm font-medium text-gray-700 mb-1">
            Search for a procedure
          </label>
          <input
            id="procedure"
            type="text"
            value={procedureSearch}
            onChange={(e) => setProcedureSearch(e.target.value)}
            placeholder="E.g., MRI, colonoscopy, blood test..."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          />
          
          {showProcedureDropdown && filteredProcedures.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
              <ul className="divide-y divide-gray-200">
                {filteredProcedures.map((procedure) => (
                  <li
                    key={procedure.code}
                    onClick={() => handleProcedureSelect(procedure)}
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{procedure.name}</span>
                      <span className="text-gray-500">CPT {procedure.code}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{procedure.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Insurance Section */}
      <div className="mb-8">
        <h3 className="text-md font-medium text-gray-700 mb-3">Insurance Information</h3>
        
        <div className="mb-3">
          <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 mb-1">
            Select your insurance provider
          </label>
          <select
            id="insurance"
            value={selectedInsurance}
            onChange={(e) => setSelectedInsurance(e.target.value)}
            disabled={noInsurance}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          >
            <option value="">Select an insurance provider</option>
            {insuranceProviders.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            id="no-insurance"
            type="checkbox"
            checked={noInsurance}
            onChange={handleNoInsuranceChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="no-insurance" className="ml-2 block text-sm text-gray-700">
            I don't have insurance (show cash prices)
          </label>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSearch}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Find Costs
        </button>
      </div>
    </div>
  );
};
