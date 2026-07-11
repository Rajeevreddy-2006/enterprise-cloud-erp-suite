interface Props {
    assets: any[];
}

function AssetCards({
    assets
}: Props) {
    const total = assets.length;
    const available = assets.filter(
        asset =>
            asset.status ===
            "AVAILABLE"
    ).length;
    const assigned = assets.filter(
        asset =>
            asset.status ===
            "ASSIGNED"
    ).length;
    const maintenance = assets.filter(
        asset =>
            asset.status ===
            "UNDER_MAINTENANCE"
    ).length;
    const retired = assets.filter(
        asset =>
            asset.status ===
            "RETIRED"
    ).length;
    return (
        <div className="grid gap-4 md:grid-cols-5">
            <div className="rounded-lg border p-5 text-slate-500">
                <p className="text-sm text-muted-foreground">
                    Total Assets
                </p>
                <h2 className="text-3xl font-bold">
                    {
                        total
                    }
                </h2>
            </div>
            <div className="rounded-lg border p-5 text-slate-500">
                <p className="text-sm text-muted-foreground">
                    Available
                </p>
                <h2 className="text-3xl font-bold text-green-500">
                    {
                        available
                    }
                </h2>
            </div>
            <div className="rounded-lg border p-5 text-slate-500">
                <p className="text-sm text-muted-foreground">
                    Assigned
                </p>
                <h2 className="text-3xl font-bold text-blue-500">
                    {
                        assigned
                    }
                </h2>
            </div>
            <div className="rounded-lg border p-5 text-slate-500">
                <p className="text-sm text-muted-foreground">
                    Maintenance
                </p>
                <h2 className="text-3xl font-bold text-yellow-500">
                    {
                        maintenance
                    }
                </h2>
            </div>
            <div className="rounded-lg border p-5 text-slate-500">
                <p className="text-sm text-slate-400">
                    Retired
                </p>
                <h2 className="text-3xl font-bold text-red-500">
                    {
                        retired
                    }
                </h2>
            </div>
        </div>
    );
}

export default AssetCards;