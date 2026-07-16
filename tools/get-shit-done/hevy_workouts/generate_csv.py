import csv

workouts = [
    {
        "date": "2024-05-01 08:00:00",
        "name": "Upper A",
        "exercises": [
            ("Incline Push-Up", 3, 12, 0, "Progress to floor push-ups once 3x12 is easy. Focus on full range."),
            ("Seated Dumbbell Shoulder Press", 3, 12, 0, "Keep core braced, press directly overhead. No arching."),
            ("Band-Assisted Pull-Up", 3, 10, 0, "Use a band heavy enough to get 6-10 reps. Pull chest to bar, controlled lowering."),
            ("Single-Arm Dumbbell Row", 3, 12, 0, "Support body with off hand on bench, pull dumbbell to hip. Squeeze shoulder blade."),
            ("Lying Triceps Extension", 2, 15, 0, "Keep elbows stationary, lower weight to forehead."),
            ("Dumbbell Chest Fly", 2, 15, 0, "Small bend in elbows, hug a tree. Feel stretch across chest."),
            ("Plank", 3, 0, 45, "Hips level, squeeze glutes. Stop if form breaks. (45s hold)")
        ]
    },
    {
        "date": "2024-05-02 08:00:00",
        "name": "Lower A",
        "exercises": [
            ("Goblet Squat", 3, 12, 0, "Hold one dumbbell at chest, elbows touch knees at bottom. Important for parade posture."),
            ("Dumbbell Walking Lunge", 3, 10, 0, "Long step, front knee stays over ankle. Keep torso tall."),
            ("Glute Bridge", 3, 20, 0, "Squeeze glutes at top, hold 1 sec. Place dumbbell on hips when ready."),
            ("Leg Press", 3, 12, 0, "If using jumps, land softly. Leg press is alternative."),
            ("Standing Calf Raise", 3, 20, 0, "Slow down, explosive up. Improves ankle stiffness for running."),
            ("Dumbbell Step-Up", 3, 10, 0, "Use knee-height box. Drive through heel, no push-off from bottom foot."),
            ("Dead Bug", 3, 8, 0, "Lower back pressed into floor, move opposite arm/leg slowly.")
        ]
    },
    {
        "date": "2024-05-03 08:00:00",
        "name": "Upper B",
        "exercises": [
            ("Negative Pull-Up", 3, 6, 0, "Use a box to reach top, fight gravity down. Builds pull-up strength rapidly."),
            ("Dumbbell Bench Press", 3, 12, 0, "Shoulders packed, touch dumbbells to chest. No bouncing."),
            ("Seated Cable Row", 3, 12, 0, "Squeeze shoulder blades together, keep back upright."),
            ("Dumbbell Lateral Raise", 3, 15, 0, "Light weight, lead with elbows. Don't swing."),
            ("Dumbbell Bicep Curl", 2, 15, 0, "Full stretch at bottom, controlled curl."),
            ("Face Pull", 3, 15, 0, "Pull to forehead, elbows high. Excellent for posture and shoulder health."),
            ("Hanging Knee Raise", 3, 15, 0, "No swinging. If too difficult, do lying leg raises instead.")
        ]
    },
    {
        "date": "2024-05-04 08:00:00",
        "name": "Lower B",
        "exercises": [
            ("Dumbbell Romanian Deadlift", 3, 12, 0, "Soft knees, push hips back, keep back straight. Feel stretch in hamstrings."),
            ("Bulgarian Split Squat", 3, 10, 0, "Upright torso, front knee doesn't cave. Add dumbbells when stable."),
            ("Dumbbell Hip Thrust", 3, 15, 0, "Upper back on bench, press through heels, full hip extension."),
            ("Copenhagen Plank", 3, 0, 30, "Hip off ground. Modified: keep bottom knee down. (30s hold)"),
            ("Reverse Crunch", 3, 15, 0, "Lift hips off floor, controlled. No momentum."),
            ("Farmer's Walk", 2, 0, 0, "Stand tall, shoulders back. Perfect for parade posture and grip. (30-40m)"),
            ("Cable Glute Kickback", 2, 15, 0, "Keep standing leg slightly bent, kick back without arching lower back.")
        ]
    }
]

headers = ["Date", "Workout Name", "Exercise Name", "Set Order", "Weight", "Weight Unit", "Reps", "Distance", "Distance Unit", "Seconds", "Notes", "Workout Notes", "RPE"]

with open('/Users/ankushroy/PPL/I P/Quicker-Faster-Stronger/hevy_workouts/Hevy_Import_Strong_Format.csv', 'w', newline='', encoding='utf-8') as f:
    # Use standard comma as per most recent Strong export formats
    writer = csv.writer(f, delimiter=',')
    writer.writerow(headers)
    for w in workouts:
        date = w["date"]
        wname = w["name"]
        for ex in w["exercises"]:
            name, sets, reps, secs, notes = ex
            for s in range(1, sets + 1):
                row = [
                    date,
                    wname,
                    name,
                    s,
                    0, # weight
                    "kg",
                    reps if reps > 0 else "",
                    "", # distance
                    "", # distance unit
                    secs if secs > 0 else "",
                    notes if s == 1 else "", # notes
                    "", # workout notes
                    "" # rpe
                ]
                writer.writerow(row)

print("Generated Hevy_Import_Strong_Format.csv successfully.")
