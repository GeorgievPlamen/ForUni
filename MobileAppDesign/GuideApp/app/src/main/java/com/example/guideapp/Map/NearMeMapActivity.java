package com.example.guideapp.Map;

import android.content.Intent;
import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.guideapp.Details.DetailsActivity;
import com.example.guideapp.R;

public class NearMeMapActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_near_me_map);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.map_root), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        findViewById(R.id.btn_back).setOnClickListener(v -> finish());

        // View details -> DetailsActivity
        findViewById(R.id.btn_view_details).setOnClickListener(v -> {
            Intent intent = new Intent(NearMeMapActivity.this, DetailsActivity.class);
            startActivity(intent);
        });
    }
}