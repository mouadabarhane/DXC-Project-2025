export default function ProductOfferingCharacteristics({
  prodSpecCharValueUse,
}: {
  prodSpecCharValueUse: {
    name: string;
    description: string;
    productSpecCharacteristicValue: { value: string }[];
  }[];
}) {
  return (
    <div className="mt-6 border-t border-gray-100">
      <dl className="divide-y divide-gray-100">
        {prodSpecCharValueUse.map((characteristic: any, index: number) => {
          return (
            <div
              className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
              key={index}
            >
              <dt className="leading-6 font-medium text-gray-900">
                <h2>{characteristic.name}</h2>
                <p className="text-sm text-gray-500">
                  {characteristic.description}
                </p>
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 relative">
                <ul className="flex gap-3 ">
                  {characteristic.productSpecCharacteristicValue.length !==
                  0 ? (
                    characteristic.productSpecCharacteristicValue.map(
                      (characteristicValue: any, index: number) => {
                        return (
                          <li
                            className="py-1 px-3 shadow-md rounded-lg font-medium text-blue-800 hover:bg-blue-100 duration-300"
                            key={index}
                          >
                            {characteristicValue.value}
                          </li>
                        );
                      },
                    )
                  ) : (
                    <h3 className="font-medium text-1xl">Empty</h3>
                  )}
                </ul>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
